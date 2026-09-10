import { Routes } from '@angular/router';
import { Main } from './main/main';
import { BmiCalc } from './bmi-calc/bmi-calc';
import { ExchangesCalc } from './exchanges-calc/exchanges-calc';
import { MealPlans } from './meal-plans/meal-plans';
import { Recipes } from './recipes/recipes';
import { MsjCalc } from './msj-calc/msj-calc';
import { Login } from './login/login';

export const routes: Routes = [
    {
        path: '',
        component: Main,
        title: 'RDToolbelt Home',
    },
    {
        path: 'login',
        component: Login,
        title: 'Login - RDToolbelt',
    },
    {
        path: 'bmi-calc',
        component: BmiCalc,
        title: 'BMI Calculator - RDToolbelt',
    },
    {
        path: 'exchanges-calc',
        component: ExchangesCalc,
        title: 'Exchanges Calculator - RDToolbelt',
    },
    {
        path: 'meal-plans',
        component: MealPlans,
        title: 'Meal Plans - RDToolbelt',
    },
    {
        path: 'recipes',
        component: Recipes,
        title: 'Recipes - RDToolbelt',
    },
    {
        path: 'msj-calc',
        component: MsjCalc,
        title: 'Mifflin-St Jeor Calculator - RDToolbelt',
    }
];
