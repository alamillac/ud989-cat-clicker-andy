import "jasmine-jquery";
import app from "../app/js/core";

describe('fixtures', () => {
    it('should be defined', () => {
        expect(readFixtures).toBeDefined();
        expect(setFixtures).toBeDefined();
        expect(loadFixtures).toBeDefined();
        expect(sandbox).toBeDefined();
    });
});

describe('Cats model', () => {
    it('should be defined', () => {
        expect(app.model).toBeDefined();
    });
    it('should get a cat', () => {
        const cat1 = app.model.getCat(1);
        expect(cat1).toEqual({id:1, name: "cat 1", counter: 0});
        const cat5 = app.model.getCat(5);
        expect(cat5).toEqual({id:5, name: "cat 5", counter: 0});
    });
    it('should get all cats', () => {
        const cats = app.model.getAllCats();
        expect(cats.length).toEqual(5);
    });
    it('should increment counter', () => {
        const catId = 1,
            cat = app.model.getCat(catId);
        expect(cat.counter).toEqual(0);
        app.model.incCounter(catId);
        expect(cat.counter).toEqual(1);
        app.model.incCounter(catId);
        expect(cat.counter).toEqual(2);
    });
});

describe('List View', () => {
    it('should be defined', () => {
        expect(app.viewList).toBeDefined();
    });

    it('should have an init method', () => {
        expect(app.viewList.init).toBeDefined();
    });

    it('should have an onClick method after init', () => {
        expect(app.viewList.onClick).not.toBeDefined();
        app.viewList.init();
        expect(app.viewList.onClick).toBeDefined();
    });

    it('should have a $mainEl', () => {
        expect(app.viewList.$mainEl).toBeDefined();
    });

    it('should update the $mainEl with init', () => {
        const $sb = sandbox();
        app.viewList.init({mainEl: $sb});
        expect(app.viewList.$mainEl).toBe($sb);
    });

    it('should have a render method', () => {
        expect(app.viewList.render).toBeDefined();
    });

    it('should render the list of cats in $mainEl', () => {
        const $sb = sandbox();
        app.viewList.init({mainEl: $sb});
        expect($sb).toBeEmpty();
        const cats = [
            {id:0, name:"cat 1", counter:0},
            {id:1, name:"cat 2", counter:0}
        ];
        app.viewList.render(cats);
        expect($sb).toHaveHtml("<button id='button0'>cat 1</button><button id='button1'>cat 2</button>");
    });

    it('should execute onClick function when a button was clicked', () => {
        const $sb = sandbox(),
            clickSpy = jasmine.createSpy('clickSpy');
        app.viewList.init({mainEl: $sb, onClick: clickSpy});
        const cats = [
            {id:0, name:"cat 1", counter:0},
            {id:1, name:"cat 2", counter:0}
        ];
        app.viewList.render(cats);
        expect(clickSpy).not.toHaveBeenCalled();
        const $button1 = $sb.find('#button1'),
            $button0 = $sb.find('#button0');
        $button1.click();
        expect(clickSpy).toHaveBeenCalledWith({id: 1, name:"cat 2", counter:0});
        $button0.click();
        expect(clickSpy).toHaveBeenCalledWith({id: 0, name:"cat 1", counter:0});
    });
});

describe('Details View', () => {
    it('should be defined', () => {
        expect(app.viewDetails).toBeDefined();
    });

    it('should have an init method', () => {
        expect(app.viewDetails.init).toBeDefined();
    });

    it('should have a $mainEl', () => {
        expect(app.viewDetails.$mainEl).toBeDefined();
    });

    it('should update the $mainEl with init', () => {
        const $sb = sandbox();
        app.viewDetails.init({mainEl: $sb});
        expect(app.viewDetails.$mainEl).toBe($sb);
    });

    it('should have a render method', () => {
        expect(app.viewDetails.render).toBeDefined();
    });

    it('should render the selected cat in $mainEl', () => {
        const $sb = sandbox();
        app.viewDetails.init({mainEl: $sb});
        expect($sb).toBeEmpty();
        const cat = {
            id: 0,
            name: "cat 1",
            counter: 8
        };
        app.viewDetails.render(cat);
        expect($sb).toHaveHtml('<div class="cat" id="cat0"><span class="counter">8</span> clicks<br><img class="clicker" src="images/cat_picture0.jpg"></div>');
    });
});

describe('Octopus', () => {
    it('should be defined', () => {
        expect(app.octopus).toBeDefined();
    });

    it('should have an init method', () => {
        expect(app.octopus.init).toBeDefined();
    });

    it('should init all the views', () => {
        const $listEl = sandbox(),
            $detailEl = sandbox();
        spyOn(app.viewList, "init");
        spyOn(app.viewDetails, "init");
        app.octopus.init({$listEl, $detailEl});
        expect(app.viewList.init).toHaveBeenCalled();
        expect(app.viewDetails.init).toHaveBeenCalled();
    });
});
