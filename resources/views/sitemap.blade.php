<?php echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n"; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach ($pages as $page)
    <url>
        <loc>{{ $page->absoluteUrl() }}</loc>
        @if ($page->lastModified())
        <lastmod>{{ $page->lastModified()->toAtomString() }}</lastmod>
        @endif
        <changefreq>weekly</changefreq>
        <priority>{{ $page->slug() === 'home' || $page->url() === '/' ? '1.0' : '0.7' }}</priority>
    </url>
@endforeach
</urlset>
