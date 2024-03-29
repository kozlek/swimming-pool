<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'firstname' => $faker->firstName,
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'gender' => '1',
        'birthdate' => $faker->dateTime->format('Y-m-d'),
        'remember_token' => str_random(10),
    ];
});


$factory->define(App\PasswordReset::class, function (Faker\Generator $faker) {
    return [
        'email'  => $faker->safeEmail,
        'token' => str_random(10),
    ];
});
