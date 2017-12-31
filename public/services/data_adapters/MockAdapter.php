<?php

class MockAdapter {
    public function get_recipe_list() {
        $recipes = [];
        $base_url = 'http://shortsrecipes.com';
        $recipes[] = [
            'id' => 1,
            'title' => 'BBQ Pork Sandwiches',
            'photo' => "{$base_url}/photos/a74f1e5e-8a52-42a2-8928-c6f0762ea332.jpg",
            'description' => "This is Jessie's favorite",
            'tags' => ['pork'],
            'ingredients' => '3 - 4 lb Pork shoulder roast
1 onion, grated
2 cloves garlic
1/4 tsp salt
2 tsp chili powder
3 Tbsp brown sugar
1/4 C vinegar
1/4 C Worcestershire sauce
1 C ketchup
2 tsp cornstarch',
            'directions' => 'Put the roast in a Dutch oven with a cup of water. Cover and place in a 250 degree oven. Slow cook all day. You can even put the roast in frozen. 
Remove the meat and reserve the broth. Shred the meat. 
Separate the fat from the broth. Add water to the broth to make 2 cups. 
Add 2 tablespoons of the fat to a saucepan. Add the onion and garlic and cook until soft. 
Add the broth and remaining ingredients. Place over medium-low heat and simmer for 25 minutes, stirring occasionally. 
Ladle 1/2 cup of the sauce out to a small bowl and let cool for 5 minutes. Add cornstarch to the little bit of sauce. Mix well and add it back to the pot. Bring to a boil, and cook for two minutes. 
Mix 1/2 cup sauce for every 1 cup of meat. 
Serve meat on toasted and buttered hamburger buns. Good with cheese & pickles.'
        ];

        $recipes[] = [
            'id' => 2,
            'title' => 'Beanie Weenie Casserole',
            'photo' => "{$base_url}/photos/fddd54f1-a542-4d06-a441-e74d0aba1ad8.jpg",
            'description' => "This is one of Grandma Duff's recipes",
            'tags' => ['beef', 'gluten free']
        ];

        $recipes[] = [
            'id' => 3,
            'title' => 'Best Sugar Cookie Recipe',
            'photo' => "{$base_url}/photos/sugar_cookies.png",
            'description' => "Jamie found this recipe and we made these for Christmas 2016",
            'tags' => ['cookies', 'Christmas']
        ];

        $recipes[] = [
            'id' => 4,
            'title' => 'Beef Stroganoff',
            'photo' => null,
            'description' => "This is one of Jessie's favorites!",
            'tags' => []
        ];
        return $recipes;
    }

    public function get_recipe_detail($id) {
        $recipes = $this->get_recipe_list();

        foreach($recipes as $recipe) {
            if ($recipe['id'] == $id) {
                return $recipe;
            }
        }

        return null;
    }

    public function get_tags() {
        return [
            'beef',
            'chicken',
            'Christmas',
            'cookies',
            'deserts',
            'gluten free',
            'mexican',
            'pasta',
            'pork',
            'rice',
            'seafood',
            'side dishes',
            'soup',
            'whole grains'


        ];
    }
}