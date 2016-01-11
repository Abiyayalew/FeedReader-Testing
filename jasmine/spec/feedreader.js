/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Spec used to test allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Urls are defined', function() {
            for(var i = 0; i < allFeeds.length;  i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* Spec used to test  allFeeds object and ensures it has a name defined 
           and that the name is not empty.
         */
        it('Names are defined', function() {
            for (var i = 0; i< allFeeds.length;  i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
        
        /*  Hidden property is set by "menu-hidden" in CCS, we need to make sure there is                       a class name "menu-hidden" in the body attribute.
        */
        
        it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
 
         /* Spec used to test menu element changes visibility when the menu icon is clicked. 
          * Using jQuery method to simulate the phyical click 
         */
        it('menu change visibility when icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
        
        
    });

    /*  Test suite named "Initial Entries" */
    
      describe('Initial Entries', function() {
          
        /* Spec used to test  when the loadFeed function is called and completes its work, there is          * at least a single .entry element within the .feed container.
        */
          
        /* initiate a loadfeed   */
        beforeEach(function(done) {
            /* clear the possible feeds before initiate*/
            $('.feed').empty();
            loadFeed(0,done);
        });


        it('has at least a single element', function() {
            var entries = $('.feed').find('.entry');
            expect(entries.length).toBeGreaterThan(0);  
        });
    });

    /*Test suite named "New Feed Selection" */
    
    describe('New Feed Selection', function() {
      
        /* Spec used to test when a new feed is loaded by load function that content actually                * changes.
         */
        var container = $('.feed');  
        beforeEach(function(done) {
            /* clear feed */
            container.empty();
            loadFeed(0, function() {
                content1 = container.find('h2').html();
                /* Nested loadfeed function inside to avoid race conditions. */
                loadFeed(1, function() {
                    /* Do the selection again and save new feed to variable. */
                    content2= container.find('h2').html();
                    done();
                });
            });
        });

        it('changes content when a new feed is loaded', function(done){
            expect(content1).not.toEqual(content2);
            done();
        });
    });
    
    
}());
