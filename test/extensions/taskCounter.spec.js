'use strict';

var TuiEditor = require('../../src/js/editor');

describe('taskCounter', function() {
    var ned;

    beforeEach(function() {
        $('body').html('<div id="editSection"></div>');
    });

    //we need to wait squire input event process
    afterEach(function(done) {
        setTimeout(function() {
            $('body').empty();
            done();
        });
    });

    describe('wysiwyg', function() {
        beforeEach(function(done) {
            ned = new TuiEditor({
                el: $('#editSection'),
                previewStyle: 'tab',
                height: 300,
                initialEditType: 'wysiwyg',
                exts: ['taskCounter'],
                querySplitter: {
                    queryRx: /@[^@\s]*/
                },
                events: {
                    'load': function() {
                        done();
                    }
                }
            });
        });

        it('get task count of content', function() {
            ned.setValue('* [ ] task1\n* [ ] task2');
            expect(ned.getTaskCount()).toEqual(2);

            ned.setValue('* [ ] task1');
            expect(ned.getTaskCount()).toEqual(1);

            ned.setValue('waefwaefwe* [ ] task1\n* [ ] task2');
            expect(ned.getTaskCount()).toEqual(1);

            ned.setValue('waefawefawefwef');
            expect(ned.getTaskCount()).toEqual(0);
        });

        it('get checked task count of content', function() {
            ned.setValue('* [ ] task1\n* [x] task2');
            expect(ned.getCheckedTaskCount()).toEqual(1);

            ned.setValue('* [x] task1');
            expect(ned.getCheckedTaskCount()).toEqual(1);

            ned.setValue('waefwaefwe* [ ] task1\n* [x] task2');
            expect(ned.getCheckedTaskCount()).toEqual(1);

            ned.setValue('waefawefawefwef');
            expect(ned.getCheckedTaskCount()).toEqual(0);
        });
    });

    describe('markdown', function() {
        beforeEach(function(done) {
            ned = new TuiEditor({
                el: $('#editSection'),
                previewStyle: 'tab',
                height: 300,
                initialEditType: 'markdown',
                exts: ['taskCounter'],
                querySplitter: {
                    queryRx: /@[^@\s]*/
                },
                events: {
                    'load': function() {
                        done();
                    }
                }
            });
        });

        it('get task count of content', function() {
            ned.setValue('* [ ] task1\n    * [ ] task2');
            expect(ned.getTaskCount()).toEqual(2);

            ned.setValue('* [ ] task1');
            expect(ned.getTaskCount()).toEqual(1);

            ned.setValue('waefwaefwe* [ ] task1\n* [ ] task2');
            expect(ned.getTaskCount()).toEqual(1);

            ned.setValue('waefawefawefwef');
            expect(ned.getTaskCount()).toEqual(0);
        });

        it('get checked task count of content', function() {
            ned.setValue('* [ ] task1\n* [x] task2');
            expect(ned.getCheckedTaskCount()).toEqual(1);

            ned.setValue('* [x] task1');
            expect(ned.getCheckedTaskCount()).toEqual(1);

            ned.setValue('waefwaefwe* [ ] task1\n* [x] task2');
            expect(ned.getCheckedTaskCount()).toEqual(1);

            ned.setValue('waefawefawefwef');
            expect(ned.getCheckedTaskCount()).toEqual(0);
        });
    });
});
