<?php

use Illuminate\Support\Facades\Route;
use Statamic\Facades\Entry;

// XML sitemap: every published page, excluding anything marked hidden.
Route::get('/sitemap.xml', function () {
    $pages = Entry::query()
        ->where('collection', 'pages')
        ->where('published', true)
        ->get()
        ->reject(fn ($entry) => $entry->value('hide_from_search') === true)
        ->filter(fn ($entry) => $entry->url());

    return response()
        ->view('sitemap', ['pages' => $pages])
        ->header('Content-Type', 'application/xml');
});
