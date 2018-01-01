<?php
require_once 'Database.php';

class DatabaseAdapter {
    public function get_recipe_list() {
        return $this->get_recipes();
    }

    public function get_recipe_detail($id) {
        return $this->get_recipes($id, 'detail');
    }

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


    private function get_recipes($id = 0, $mode='list') {
        $recipes = [];
        try {
            $conn = Database::getInstance()->getConnection();

            if ($mode == 'detail') {
                $sql = "SELECT * FROM recipes WHERE recipe_id = {$id}";
            }
            else {
                $sql = "SELECT recipe_id, title, description, photo FROM recipes ORDER BY title";
            }

            $results = $conn->query($sql);
            if ($results->num_rows == 0) {
                throw new HttpException("Not found", 404);
            }

            while ($row = $results->fetch_assoc()) {
                $recipe = [
                    'id' => $row['recipe_id'],
                    'title' => $row['title'],
                    'description' => $row['description'],
                    'photo' => $row['photo'],
                    'tags' => []
                ];

                if ($mode == 'detail') {
                    $recipe['prep_time'] = $row['prep_time'];
                    $recipe['ingredients'] = $row['ingredients'];
                    $recipe['directions'] = $row['directions'];
                }

                $recipes[] = $recipe;
            }

            // Get the tags for each recipe
            $sql = <<< SQL
              SELECT recipe_labels.recipe_id, labels.name AS tag_name FROM recipe_labels
              JOIN labels ON labels.label_id = recipe_labels.label_id 
SQL;

            if ($mode == 'detail') {
                $sql .= " WHERE recipe_labels.recipe_id = {$id}}";
            }

            $results = $conn->query($sql);
            if ($results->num_rows > 0) {
                $tags = [];
                while ($row = $results->fetch_assoc()) {
                    if (!array_key_exists($row['recipe_id'], $tags)) {
                        $tags[$row['recipe_id']] = [];
                    }
                    $tags[$row['recipe_id']][] = strtolower($row['tag_name']);
                }

                foreach ($recipes as $key => $recipe) {
                    $recipe['tags'] = $tags[$recipe['id']];
                    $recipes[$key] = $recipe;
                }
            }
        }
        finally {
            if ($conn) {
                $conn->close();
            }
        }

        if ($id != 0) {
            return $recipes[0];
        }
        return $recipes;
    }
}