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
     * @throws  HttpException
     */
    public function get_recipe_list($keywords) {
        return $this->fetch_recipe_summary($keywords);
    }


    /**
     * Get recipe detail
     *
     * @param   int     $recipe_id
     *
     * @return array
     * @throws Exception
     * @throws HttpException
     */
    public function get_recipe_detail($recipe_id) {
        return $this->fetch_recipe_by_id($recipe_id);
    }

    /**
     * Get Tags
     *
     * @return array
     * @throws Exception
     * @throws HttpException
     */
    public function get_tags() {
        $tags = [];
        try {
            $conn = Database::getInstance()->getConnection();

            $sql = "SELECT * FROM labels";
            $results = $conn->query($sql);
            if ($results->num_rows == 0) {
                throw new HttpException("Not found", 404);
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


    public function get_tags_by_recipe_id($id) {
        return $this->fetch_tags_by_recipe_id($id);
    }



    /**
     * Fetch a recipe by id from the database
     *
     * @param   int   $recipe_id    database id of the recipe to fetch
     *
     * @return  array               array of recipe info for the recipe with the given id
     * @throws  Exception
     * @throws  HttpException
     */
    private function fetch_recipe_by_id($recipe_id) {
        $recipe = [];
        try {
            $mysqli = Database::getInstance()->getConnection();

            $sql = <<< SQL
                SELECT recipe_id, title, prep_time, description, photo, ingredients, directions
                FROM recipes
                WHERE recipe_id = ?
SQL;

            $stmt = $mysqli->prepare($sql);
            if ($stmt === false) {
                throw new HttpException('Could not prepare statement.');
            }

            $stmt->bind_param('i', $recipe_id);
            $stmt->execute();
            $stmt->bind_result($recipe_id, $title, $prep_time, $description, $photo, $ingredients, $directions);
            $status = $stmt->fetch();
            if ($status === false) {
                throw new HttpException('Could not fetch results.');
            }
            if ($status === null) {
                throw new HttpException('Recipe not found.');
            }

            $recipe = [
                'id' => $recipe_id,
                'title' => $title,
                'prep_time' => $prep_time,
                'description' => $description,
                'photo' => $photo,
                'ingredients' => $ingredients,
                'directions' => $directions,
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
     * @throws  HttpException
     */
    private function fetch_recipe_summary($keywords = '') {
        $summary = [];
        try {
            $mysqli = Database::getInstance()->getConnection();

            $keyword_clause = '';
            if (!empty($keywords)) {
                $keyword_clause = "WHERE MATCH (title, description, ingredients, directions) AGAINST (? IN NATURAL LANGUAGE MODE)";
            }

            $sql = <<< SQL
                SELECT recipes.recipe_id, title, description, photo, labels.name AS tag_name
                FROM recipes
                LEFT JOIN recipe_labels ON recipe_labels.recipe_id = recipes.recipe_id
                LEFT JOIN labels ON labels.label_id = recipe_labels.label_id
                {$keyword_clause}
                ORDER BY title, recipes.recipe_id
SQL;

            $stmt = $mysqli->prepare($sql);
            if ($stmt === false) {
                throw new HttpException('Could not prepare statement.');
            }

            if (!empty($keywords)) {
                $stmt->bind_param('s', $keywords);
            }
            $stmt->execute();
            $stmt->bind_result($recipe_id, $title, $description, $photo, $tag_name);
            $status = $stmt->fetch();
            if ($status === false) {
                throw new HttpException('Could not fetch results.');
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
     * Fetch the tags assigned to the recipe with the given recipe id
     *
     * @param   int     $recipe_id  database id of the recipe to fetch
     *
     * @return  array   array of tag names for the given recipe id
     * @throws  Exception
     * @throws  HttpException
     */
    private function fetch_tags_by_recipe_id($recipe_id) {
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
                throw new HttpException("{$F} Could not prepare statement.");
            }

            $stmt->bind_param('i', $recipe_id);
            $stmt->execute();
            $stmt->bind_result($tag_name);
            while ($stmt->fetch()) {
                $tags[] = $tag_name;
            }
        }
        finally {
            if ($mysqli) {
                $mysqli->close();
            }
        }

        return $tags;
    }
}