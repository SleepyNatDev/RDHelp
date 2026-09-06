import { Routes } from '@angular/router';
import { Main } from './main/main';
import { BmiCalc } from './bmi-calc/bmi-calc';
import { ExchangesCalc } from './exchanges-calc/exchanges-calc';
import { MealPlans } from './meal-plans/meal-plans';
import { Recipes } from './recipes/recipes';

export const routes: Routes = [
    {
        path: '',
        component: Main,
        title: 'RDHelp Home',
    },
    {
        path: 'bmi-calc',
        component: BmiCalc,
        title: 'BMI Calculator',
    },
    {
        path: 'exchanges-calc',
        component: ExchangesCalc,
        title: 'Exchanges Calculator',
    },
    {
        path: 'meal-plans',
        component: MealPlans,
        title: 'Meal Plans',
    },
    {
        path: 'recipes',
        component: Recipes,
        title: 'Recipes',
    }
];
