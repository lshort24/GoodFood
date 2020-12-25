<?php
require_once 'Database.php';

class DatabaseAdapter {
    /**
     * Get the recipe summary
     *
     * @param   string  $keywords   (optional) a list of keywords to filter by
     *
     * @return  array       array of recipe summary info
     * @throws  Exception
     * @throws  Exception
     */
    public function get_recipe_list(string $keywords) : array {
        return $this->fetch_recipe_summary($keywords);
    }


    /**
     * Get recipe detail
     *
     * @param   int     $recipe_id
     *
     * @return array
     * @throws Exception
     * @throws Exception
     */
    public function get_recipe_detail(int $recipe_id) : array {
        return $this->fetch_recipe_by_id($recipe_id);
    }

    /**
     * Get Tags
     *
     * @return array
     * @throws Exception
     * @throws Exception
     */
    public function get_tags(): array {
        $tags = [];
        try {
            $conn = Database::getInstance()->getConnection();

            $sql = "SELECT * FROM labels";
            $results = $conn->query($sql);
            if ($results->num_rows == 0) {
                throw new Exception("Not found", 404);
            }

            while ($row = $results->fetch_assoc()) {
                $tags[] = strtolower($row['name']);
            }
        }
        finally {
            if ($conn) {
                $conn->close();
            }
        }

        return $tags;
    }

    /**
     * Get tags given a recipe id
     *
     * @param int $id
     * @return array
     * @throws Exception
     */
    public function get_tags_by_recipe_id(int $id) : array {
        return $this->fetch_tags_by_recipe_id($id);
    }



    /**
     * Fetch a recipe by id from the database
     *
     * @param   int   $recipe_id    database id of the recipe to fetch
     *
     * @return  array               array of recipe info for the recipe with the given id
     * @throws  Exception
     * @throws  Exception
     */
    private function fetch_recipe_by_id(int $recipe_id) : array {
        $recipe = [];
        try {
            $mysqli = Database::getInstance()->getConnection();

            $sql = <<< SQL
                SELECT recipe_id, title, prep_time, description, photo, ingredients, directions, markdown_recipe
                FROM recipes
                WHERE recipe_id = ?
SQL;

            $stmt = $mysqli->prepare($sql);
            if ($stmt === false) {
                throw new Exception('Could not prepare statement.');
            }

            $stmt->bind_param('i', $recipe_id);
            $stmt->execute();
            $stmt->bind_result($recipe_id, $title, $prep_time, $description, $photo, $ingredients, $directions, $markdown);
            $status = $stmt->fetch();
            if ($status === false) {
                throw new Exception('Could not fetch results.');
            }
            if ($status === null) {
                throw new Exception('Recipe not found.');
            }

            $recipe = [
                'id' => $recipe_id,
                'title' => $title,
                'prep_time' => $prep_time,
                'description' => $description,
                'photo' => $photo,
                'ingredients' => $ingredients,
                'directions' => $directions,
                'markdown' => $markdown,
                'tags' => $this->fetch_tags_by_recipe_id($recipe_id)
            ];
        }
        finally {
            if ($mysqli) {
                $mysqli->close();
            }
        }

        return $recipe;
    }


    /**
     * Fetch recipe summary
     *
     * @param   string      $keywords   keywords to filter on
     *
     * @return  array                   array of recipe summary info
     * @throws  Exception
     * @throws  Exception
     */
    private function fetch_recipe_summary(string $keywords = '') : array {
        $summary = [];
        try {
            $mysqli = Database::getInstance()->getConnection();

            $where = "";
            $bind_types = "";
            $bind_vars = [];
            if (!empty($keywords)) {
                $where_clauses = [];
                $recipe_ids_for_tag_matches = $this->search_tags($keywords);
                if (!empty($recipe_ids_for_tag_matches)) {
                    $qMarks = str_repeat('?,', count($recipe_ids_for_tag_matches) - 1) . '?';
                    $bind_types .= str_repeat('i', count($recipe_ids_for_tag_matches));
                    $bind_vars = $recipe_ids_for_tag_matches;
                    $where_clauses[] = "recipes.recipe_id IN ($qMarks)";
                }
                $where_clauses[] = "MATCH (title, description, ingredients, directions, markdown_recipe) AGAINST (? IN NATURAL LANGUAGE MODE)";
                $bind_types .= 's';
                $bind_vars[] = $keywords;

                if (!empty($where_clauses)) {
                    $where = 'WHERE ' . implode(' OR ', $where_clauses);
                }
            }

            $sql = "
                SELECT recipes.recipe_id, title, description, photo, labels.name AS tag_name
                FROM recipes
                LEFT JOIN recipe_labels ON recipe_labels.recipe_id = recipes.recipe_id
                LEFT JOIN labels ON labels.label_id = recipe_labels.label_id
                {$where}
                ORDER BY title, recipes.recipe_id
            ";

            $stmt = $mysqli->prepare($sql);
            if ($stmt === false) {
                $values = implode(',', $bind_vars);
                throw new Exception('Could not prepare statement.' . $sql . "\nbind_types:" . $bind_types . "\nbind_vars: " . $values);
            }

            if (!empty($bind_vars)) {
                $stmt->bind_param($bind_types, ...$bind_vars);
            }
            $stmt->execute();
            $stmt->bind_result($recipe_id, $title, $description, $photo, $tag_name);
            $status = $stmt->fetch();
            if ($status === false) {
                $values = implode(',', $bind_vars);
                throw new Exception("Could not fetch results. sql: {$sql} bind_types: {$bind_types} bind_vars: {$values}");
            }

            $working_summary = [];
            while ($status) {
                if (!empty($working_summary) and $recipe_id != $working_summary['id']) {
                    // We are changing recipes
                    $summary[] = $working_summary;
                    $working_summary = [];
                }

                if (empty($working_summary)) {
                    $working_summary = [
                        'id' => $recipe_id,
                        'title' => $title,
                        'description' => $description,
                        'photo' => $photo,
                        'tags' => []
                    ];
                }

                if (!empty($tag_name)) {
                    $working_summary['tags'][] = strtolower($tag_name);
                }

                $status = $stmt->fetch();
            }

            if (!empty($working_summary)) {
                $summary[] = $working_summary;
            }
        }
        finally {
            if ($mysqli) {
                $mysqli->close();
            }
        }

        return $summary;
    }


    /**
     * Search tags for keywords
     *
     * @param string $keywords
     * @return int[]
     * @throws Exception
     */
    private function search_tags(string $keywords) : array {
        if (empty($keywords)) {
            return [];
        }

        $recipe_ids = [];
        try {
            $mysqli = Database::getInstance()->getConnection();

            $sql = "
                SELECT recipe_id FROM labels
                JOIN recipe_labels ON recipe_labels.label_id = labels.label_id
                WHERE MATCH (name) AGAINST (? IN NATURAL LANGUAGE MODE)
            ";

            $stmt = $mysqli->prepare($sql);
            if ($stmt === false) {
                throw new Exception('Could not prepare statement.');
            }

            $stmt->bind_param('s', $keywords);
            $stmt->execute();
            $stmt->bind_result($recipe_id);
            $status = $stmt->fetch();
            if ($status === false) {
                throw new Exception('Could not fetch results.');
            }

            while ($status) {
                $recipe_ids[] = $recipe_id;
                $status = $stmt->fetch();
            }
        }
        finally {
            if ($mysqli) {
                $mysqli->close();
            }
        }

        return $recipe_ids;
    }


    /**
     * Fetch the tags assigned to the recipe with the given recipe id
     *
     * @param   int     $recipe_id  database id of the recipe to fetch
     *
     * @return  array   array of tag names for the given recipe id
     * @throws  Exception
     * @throws  Exception
     */
    private function fetch_tags_by_recipe_id(int $recipe_id) : array {
        $F = __CLASS__ . __FUNCTION__;
        $tags = [];

        try {
            $mysqli = Database::getInstance()->getConnection();
            $sql = <<<SQL
                SELECT labels.name AS tag_name 
                FROM recipe_labels
                JOIN labels ON labels.label_id = recipe_labels.label_id 
                WHERE recipe_labels.recipe_id = ?
SQL;

            $stmt = $mysqli->prepare($sql);
            if ($stmt === false) {
                throw new Exception("{$F} Could not prepare statement.");
            }

            $stmt->bind_param('i', $recipe_id);
            $stmt->execute();
            $stmt->bind_result($tag_name);
            while ($stmt->fetch()) {
                $tags[] = $tag_name;
            }
        }
        catch (Throwable $e) {
            throw new Exception("");
        }
        finally {
            if ($mysqli) {
                $mysqli->close();
            }
        }

        return $tags;
    }
}