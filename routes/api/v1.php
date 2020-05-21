<?php
    Route::apiResource('categories', 'Category\CategoryController');
    Route::prefix('categories/{category}')->name('category.')->group(function () {
        Route::namespace('Category')->group(function () {
            Route::apiResource('products', 'ProductController');
        });
    });

    Route::apiResource('products', 'Product\ProductController');
