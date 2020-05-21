<?php

namespace Tests\Feature\Api\V1\Category;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * @group Api.V1.Category
 * @group Api.V1.Category.CategoryController
 */
class CategoryControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testAll()
    {

        //  Store
        $response = $this->postJson('/api/v1/categories', []);

        $response->assertStatus(422);

        $response = $this->postJson('/api/v1/categories', [
            'name' => 'Test Category',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Test Category',
                ],
            ]);

        
        

        //  Show
        $response = $this->get('/api/v1/categories/1');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Test Category',
                ],
            ])
        ;

        //  Update
        $response = $this->patchJson('/api/v1/categories/1', [
            'name' => 'Test Category Update',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Test Category Update',
                ],
            ])
        ;

        
        //  Index
        $response = $this->get('/api/v1/categories');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'id' => 1,
                        'name' => 'Test Category Update',
                    ],
                ],
            ])
        ;

        //  Destroy
        $response = $this->delete('/api/v1/categories/1');

        $response->assertStatus(204);
    }
}
