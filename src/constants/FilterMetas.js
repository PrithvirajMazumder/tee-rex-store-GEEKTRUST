export const FilterTypes = {
    singleSelect: 1,
    range: 2,
}

export const FilterOptions = [
    {
        key: 'color',
        values: ['Blue', 'Red', 'Green'],
        type: FilterTypes.singleSelect,
    },
    {
        key: 'gender',
        values: ['Men', 'Women'],
        type: FilterTypes.singleSelect,
    },
    {
        key: 'type',
        values: ['Polo', 'Hoodie', 'Basic'],
        type: FilterTypes.singleSelect,
    },
    {
        key: 'price',
        values: [
            {
                start: 0,
                end: 250,
            },
            {
                start: 251,
                end: 450,
            },
            {
                start: 450,
                end: 600,
            },
        ],
        type: FilterTypes.range,
    },
];