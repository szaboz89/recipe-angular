import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    // return this.httpClient.put('https://test-recipe-book-6a829.firebaseio.com/recipes.json?auth=' + token,
    //     this.recipeService.getRecipes(),
    // return this.httpClient.put('https://test-recipe-book-6a829.firebaseio.com/recipes.json',
    //     this.recipeService.getRecipes(),
    //     {
    //         observe: 'body',
    //         params: new HttpParams().set('auth', token)
    //         // observe: 'events',
    //         // headers: new HttpHeaders().set('Authorization', 'token').append('Next', 'next')
    //     }
    // );
    const req = new HttpRequest('PUT', 'https://test-recipe-book-6a829.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
        reportProgress: true,
        params: new HttpParams().set('auth', token)
    });
    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>('https://test-recipe-book-6a829.firebaseio.com/recipes.json?auth=' + token)
    // this.httpClient.get<Recipe[]>('https://test-recipe-book-6a829.firebaseio.com/recipes.json?auth=' + token, {
    //     observe: 'response',
    //     responseType: 'json'
    // })
      .map(
        // (response: Response) => {
        (recipes) => {
          // const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
