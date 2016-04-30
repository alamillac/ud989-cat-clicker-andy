import $ from 'jquery';

const model = {
    cats: [
        {
            id: 1,
            name: "cat 1",
            counter: 0
        },
        {
            id: 2,
            name: "cat 2",
            counter: 0
        },
        {
            id: 3,
            name: "cat 3",
            counter: 0
        },
        {
            id: 4,
            name: "cat 4",
            counter: 0
        },
        {
            id: 5,
            name: "cat 5",
            counter: 0
        }
    ],

    getAllCats() {
        return this.cats.slice(0);
    },

    getCat(id) {
        const catsFound = this.cats.filter((cat) => cat.id === id);
        return catsFound && catsFound[0];
    },

    incCounter(catId) {
        const cat = this.getCat(catId);
        if(cat) {
            cat.counter += 1;
        }
    }
};

const octopus = {
    currentCatId: null,
    init({$listEl, $detailEl}) {
        viewList.init({mainEl: $listEl, onClick: this.onSelectCat.bind(this)});
        viewDetails.init({mainEl: $detailEl, onClick: this.onClickCat.bind(this)});
        const cats = model.getAllCats();
        if(cats.length) {
            viewList.render(cats);
            this.currentCatId = cats[0].id;
            viewDetails.render(cats[0]);
        }
    },
    onSelectCat(cat) {
        viewDetails.render(cat);
        this.currentCatId = cat.id;
    },
    onClickCat() {
        model.incCounter(this.currentCatId);
        const cat = model.getCat(this.currentCatId);
        viewDetails.updatesClicks(cat.counter);
    }
};

const viewList = {
    $mainEl: null,
    init({mainEl = null, onClick = ()=>{}} = {}) {
        this.$mainEl = mainEl;
        this.onClick = onClick;
        this._onClick = this._onClick.bind(this);
    },
    render(cats) {
        cats.forEach((cat) => {
            const $button = $('<button></button>');
            $button.text(cat.name);
            $button.attr('id', `button${cat.id}`);
            $button.on('click', this._onClick(cat));
            this.$mainEl.append($button);
        });
    },
    _onClick(cat) {
        return (e) => {
            e.preventDefault();
            this.onClick(cat);
        };
    }
};

const viewDetails = {
    $mainEl: null,
    init({mainEl, onClick = ()=>{}} = {}) {
        this.$mainEl = mainEl;
        this.onClick = onClick;
    },
    render(cat) {
        const html = `<div class="cat" id="cat${cat.id}"><span class="counter">${cat.counter}</span> clicks<br><img class="clicker" src="images/cat_picture${cat.id}.jpg"></div>`;
        this.$mainEl.html(html);
        this.setEventsHandler();
    },
    setEventsHandler() {
        console.log("Eventhandler");
        this.$mainEl.find('.cat').on('click', this.onClick);
    },
    updatesClicks(counter) {
        console.log("contador actualizado");
        this.$mainEl.find('.counter').text(counter);
    }
};

module.exports = {
    model,
    octopus,
    viewList,
    viewDetails
};
