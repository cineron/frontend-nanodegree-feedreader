const bodySelection = "body";
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
    const bodyElement = document.querySelector(bodySelection);


    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("has a defined URL and it's not empty.", function () {
            //loop through each feed in the array
            for (feed of allFeeds){
                //check that there's a URL there and it's not null or empty
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("", null);
            }
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("has a defined Name and it's not empty.", () => {
            //loop through each feed in the array
            for (feed of allFeeds){
                //check that there's a name and it's not empty
                expect(feed.name).toBeDefined;
                //from https://www.youtube.com/watch?v=7kOBXPbDmyw&feature=youtu.be
                expect(feed.name).not.toBe("", null);
            }
            
        });
    });


    /* This is atest suite named "The menu" */
    describe("The menu", () =>{

        /* This is a test that ensures the menu element is
         * hidden by default. 
         */
        it("is hidden by default.", () => {
            //select the "body" element
            // let bodyElement = document.querySelector("body");
            //check to see if the menu has "menu-hidden" class
            expect(bodyElement.classList.contains("menu-hidden")).toBe(true);
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it("toggles visibility when clicked", () => {
            let menuClick = bodyElement.querySelector(".menu-icon-link");
            // let menu = bodyElement.querySelector(".menu-hidden");
            //from Cranford walkthrough https://matthewcranford.com/feed-reader-walkthrough-part-3-menu-test-suite/
            //open the menu
            menuClick.click();
            expect(bodyElement.classList.contains("menu-hidden")).toBe(false);
            //close the menu
            menuClick.click();
            expect(bodyElement.classList.contains("menu-hidden")).toBe(true);
        });
    });
    /* This is a new test suite named "Initial Entries" */
    describe("Initial Entries", ()=>{

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((done) => {
            loadFeed(0, done);
        });

        it("has at least one .entry element in the .feed container after loadFeed runs", ()=>{
            //grab the whole feed
            // let feed = bodyElement.querySelector(".feed");
            // let entry = bodyElement.querySelectorAll(".entry-link");
            const feed = $('.feed .entry');
            // test that there's a feed
            expect(feed.children.length >= 1).toBe(true);
            // test that there is an entry
            // expect(entry.length > 0).toBe(true);
        });
    });
    /* This is a new test suite named "New Feed Selection" */
    describe("New Feed Selection", () => {
    // describe("New Feed Selection", () => {
    
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feedAfterFirstLoad;
        let feedAfterSecondLoad;
        let feed = document.querySelector(".feed");
        // let firstFeed = [];
        //load the feeds BEFORE
    //     beforeEach((done) => {
        beforeEach((done) => {
            loadFeed(0, () => {
                // console.log(feed.children[0].innerText);
                // feedAfterFirstLoad = $('.feed').innerText;
                feedAfterFirstLoad = feed.children[0].innerText;
                console.log(feedAfterFirstLoad);

                loadFeed(1, () => {
                    // feedAfterSecondLoad = $('.feed').innerText;
                    feedAfterSecondLoad = feed.children[0].innerText;
                    console.log(feedAfterSecondLoad);
                    done();
                });
            });
        });
        
        
        // let feedAfterFirstLoad;
        // let feedAfterSecondLoad;
        // beforeEach(function(done){
        //     loadFeed(0, function () {
        //     // great place to get content of feed container
        //     // you can use jQuery .html or .innerHTML method to do that for You
        //         loadFeed(1, function () {
        //         // get content of feed container again
        //         done();
        //         });
        //     });
        // });

        // beforeEach(function(done){
        //     loadFeed(0, function(){
        //         initialfeed = $('.feed').innerText;
        //             loadFeed(1, function() {
        //                 finalFeed = ...          
        //                 done() ; // call done when variables are fed and tests can begin
        //             });
        //     });
        // });
    
        //from Cranford walkthrough
        it("loads new content", () => {
            //console.log(feed.children[0].innerText);
            expect(feedAfterFirstLoad).not.toEqual(feedAfterSecondLoad);
            //convert the feed to an array and loop over it
            // Array.from(feed.children).forEach((entry, index) => {
                // expect(entry.innerText, firstFeed[index], entry.inner === firstFeed[index]);
                //check that entries are not equal, therefore new
                // expect(entry.innerText === firstFeed[index]).toBe(false);
            // });
        });
    });
}());
