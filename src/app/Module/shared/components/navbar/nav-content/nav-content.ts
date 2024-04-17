export const navigation = {

    women:{
        id:'women',
        name:'Women',
        featured: [
            {
            name:'New Arrivals',
            id: '#',
            
            },
        ],
        sections:[
            {
                id: 'clothing',
                name: 'Clothing',
                items: [
                    {name: 'Tops', id:'top', href: '{women/clothing/tops}'},
                    {name: 'Dresses', id:'women_dress', href: '#'},
                    {name: 'Pants', id:'women_jeans'},
                    {name: 'Skirts', id:'women_skirts'},
                    {name: 'Hoodies', id:'women_hoodies'},
                    {name: 'Fishnets', id:'women_fishnets'},
                    {name: 'Panties', id:'women_panties'},
                ]
            },
            {
                id: 'accessories',
                name: 'Accessories',
                items: [
                    {name: 'Watches', id: 'watch'},
                    {name: 'Wallets', id: 'wallet'},
                    {name: 'Bags', id: 'bag'},
                    {name: 'Sunglasses', id: 'sunglasses'},
                    {name: 'Hats', id: 'hat'},
                    {name: 'Belts', id: 'belt'},
                ],
            },
            {
                id:'brands',
                name:'Brands',
                items:[
                    {name:'Full Nelson', id:'#'},
                    {name:'My Way', id:'#'},
                    {name:'Re-Arranged', id:'#'},
                    {name:'Counterfeit', id:'#'},
                    {name:'Significant Other', id:'#'},
                ]
            },

        ]

    },

    men:{
        id:'men',
        name:'Men',
        featured: [
            
        ],
        sections:[
            {
                id: 'clothing',
                name: 'Clothing',
                items: [
                    {name: 'Caps', id:'caps', href: '{men/clothing/caps}'},
                    {name: 'Overalls', id:'men_overalls', href: '#'},
                    {name: 'Pants', id:'men_pants'},
                    {name: 'Hoodies', id:'men_hoodies'},
                    {name: 'T-shirts', id:'men_t-shirts'},
                    {name: 'Jackets', id:'men_jackets'},
                ]
            },
            {
                id: 'accessories',
                name: 'Accessories',
                items: [
                    {name: 'Watches', id: 'watch'},
                    {name: 'Wallets', id: 'wallet'},
                    {name: 'Bags', id: 'bag'},
                    {name: 'Sunglasses', id: 'sunglasses'},
                    {name: 'Hats', id: 'hat'},
                    {name: 'Belts', id: 'belt'},
                ],
            },
            {
                id:'brands',
                name:'Brands',
                items:[
                    {name:'Full Nelson', id:'#'},
                    {name:'My Way', id:'#'},
                    {name:'Re-Arranged', id:'#'},
                    {name:'Counterfeit', id:'#'},
                    {name:'Significant Other', id:'#'},
                ]
            },

        ]

    },
}