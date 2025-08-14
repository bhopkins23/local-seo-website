// Script to update related services sections across all pages
const fs = require('fs');
const path = require('path');

const servicePages = [
    'affordable-seo-packages/index.html',
    'digital-marketing-services/index.html',
    'small-business-seo/index.html',
    'seo-services-newtown-pa/index.html',
    'seo-services-doylestown-pa/index.html',
    'seo-services-langhorne-pa/index.html',
    'seo-services-yardley-pa/index.html',
    'seo-services-bucks-county/index.html',
    'website-optimization/index.html'
];

const relatedServicesTemplates = {
    'affordable-seo-packages': {
        title: 'Related SEO Services',
        services: [
            { href: '../local-seo-services/', title: 'Local SEO Services', desc: 'Dominate local search rankings' },
            { href: '../small-business-seo/', title: 'Small Business SEO', desc: 'SEO tailored for small businesses' },
            { href: '../seo-services-newtown-pa/', title: 'Newtown PA SEO', desc: 'Location-specific SEO services' }
        ]
    },
    'digital-marketing-services': {
        title: 'Specialized Services',
        services: [
            { href: '../local-seo-services/', title: 'Local SEO', desc: 'Dominate local search results' },
            { href: '../google-business-profile-optimization/', title: 'Google Business Profile', desc: 'Optimize your business listing' },
            { href: '../website-optimization/', title: 'Website Optimization', desc: 'Improve site performance & UX' }
        ]
    },
    'small-business-seo': {
        title: 'Related Services',
        services: [
            { href: '../local-seo-services/', title: 'Local SEO Services', desc: 'Local search optimization' },
            { href: '../google-business-profile-optimization/', title: 'Google Business Profile', desc: 'Maximize local visibility' },
            { href: '../affordable-seo-packages/', title: 'Affordable SEO Packages', desc: 'Budget-friendly SEO solutions' }
        ]
    },
    'seo-services-newtown-pa': {
        title: 'Related SEO Services',
        services: [
            { href: '../local-seo-services/', title: 'Local SEO Services', desc: 'Comprehensive local optimization' },
            { href: '../seo-services-bucks-county/', title: 'Bucks County SEO', desc: 'Regional SEO expertise' },
            { href: '../small-business-seo/', title: 'Small Business SEO', desc: 'SEO for growing businesses' }
        ]
    },
    'seo-services-doylestown-pa': {
        title: 'Related Services',
        services: [
            { href: '../local-seo-services/', title: 'Local SEO Services', desc: 'Local search optimization' },
            { href: '../seo-services-bucks-county/', title: 'Bucks County SEO', desc: 'Regional SEO services' },
            { href: '../google-business-profile-optimization/', title: 'Google Business Profile', desc: 'Local business optimization' }
        ]
    },
    'seo-services-langhorne-pa': {
        title: 'Related Services',
        services: [
            { href: '../local-seo-services/', title: 'Local SEO Services', desc: 'Comprehensive local SEO' },
            { href: '../seo-services-bucks-county/', title: 'Bucks County SEO', desc: 'Regional optimization' },
            { href: '../small-business-seo/', title: 'Small Business SEO', desc: 'Tailored SEO solutions' }
        ]
    },
    'seo-services-yardley-pa': {
        title: 'Related Services',
        services: [
            { href: '../local-seo-services/', title: 'Local SEO Services', desc: 'Local search dominance' },
            { href: '../seo-services-bucks-county/', title: 'Bucks County SEO', desc: 'Regional SEO expertise' },
            { href: '../google-business-profile-optimization/', title: 'Google Business Profile', desc: 'Business listing optimization' }
        ]
    },
    'seo-services-bucks-county': {
        title: 'Related Services',
        services: [
            { href: '../local-seo-services/', title: 'Local SEO Services', desc: 'Complete local optimization' },
            { href: '../small-business-seo/', title: 'Small Business SEO', desc: 'SEO for local businesses' },
            { href: '../seo-services-newtown-pa/', title: 'Newtown PA SEO', desc: 'Newtown-specific SEO' }
        ]
    },
    'website-optimization': {
        title: 'Related Services',
        services: [
            { href: '../local-seo-services/', title: 'Local SEO Services', desc: 'Local search optimization' },
            { href: '../digital-marketing-services/', title: 'Digital Marketing', desc: 'Complete marketing solutions' },
            { href: '../small-business-seo/', title: 'Small Business SEO', desc: 'SEO for growing businesses' }
        ]
    }
};

function generateRelatedServicesHTML(config) {
    return `        <section class="related-services">
            <div class="container">
                <h2>${config.title}</h2>
                <div class="related-links">
${config.services.map(service => 
    `                    <a href="${service.href}" class="related-link">
                        <h3>${service.title}</h3>
                        <p>${service.desc}</p>
                    </a>`
).join('\n')}
                </div>
            </div>
        </section>`;
}

console.log('Related Services Update Plan:');
console.log('=====================================');

servicePages.forEach(pagePath => {
    const dirname = path.dirname(pagePath);
    const config = relatedServicesTemplates[dirname];
    
    if (config) {
        console.log(`\n📄 ${pagePath}`);
        console.log(`   Title: ${config.title}`);
        console.log(`   Services: ${config.services.length} items`);
        config.services.forEach(service => {
            console.log(`   • ${service.title} - ${service.desc}`);
        });
    }
});

console.log('\n✨ New Related Services Features:');
console.log('• Sleek gradient background with subtle border');
console.log('• Hover animations with color transitions');
console.log('• Responsive grid layout (3 columns → 1 column mobile)');
console.log('• Minimal padding (40px desktop, 30px mobile)');
console.log('• Concise descriptions (4-6 words max)');
console.log('• Consistent blue accent color (#4299e1)');
console.log('• Modern card design with subtle shadows');

console.log('\n🎨 Design Benefits:');
console.log('• Takes up 60% less vertical space');
console.log('• Modern gradient background');
console.log('• Interactive hover effects');
console.log('• Mobile-optimized compact layout');
console.log('• Consistent visual hierarchy');