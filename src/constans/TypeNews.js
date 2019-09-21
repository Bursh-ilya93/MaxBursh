class TypeNews {
    data = [
        {slug : "site", name : "Новости сайта", id : 5},
        {slug : "sport", name : "Новости спорта", id : 0},
        {slug : "analyst", name : "Аналитика", id : 24}
    ];

    static getTypeNews() {
        const typeNews = new TypeNews();
        return typeNews.data;
    }

    static getIdByType(type) {
        const typeNews = new TypeNews();
        const filtered = typeNews.data.filter((item) => {return item.slug === type});
        return filtered.length > 0 ? filtered[0].id : 0;
    }

    static getNameByType(type) {
        const typeNews = new TypeNews();
        const filtered = typeNews.data.filter((item) => {return item.slug === type});
        return filtered.length > 0 ? filtered[0].name : '';
    }
}

export default TypeNews;