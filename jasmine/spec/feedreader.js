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


        /* TODO: Write a test that loops through each feed
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


        /* TODO: Write a test that loops through each feed
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
            
        })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", () =>{

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("is hidden by default.", () => {
            //select the "body" element
            let bodyElement = document.querySelector("body");
            //check to see if the menu has "menu-hidden" class
            expect(bodyElement.classList.contains("menu-hidden")).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it("toggles visibility when clicked", () => {
            let menu = document.querySelector(".menu-icon-link");
            //from Cranford walkthrough https://matthewcranford.com/feed-reader-walkthrough-part-3-menu-test-suite/
            menu.click();
            expect(menu.classList.contains("menu-hidden")).toBe(false);

        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", ()=>{

        /* TODO: Write a test that ensures when the loadFeed
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
            let feed = document.querySelector(".feed");
            // test that there's something there
            expect(feed.children.length >= 1).toBe(true);
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
        describe("New Feed Selection", () => {
    // describe("New Feed Selection", () => {
    
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feed = document.querySelector(".feed");
        let firstFeed = [];
        //load the feeds BEFORE
    //     beforeEach((done) => {
        beforeEach((done) => {
            loadFeed(0);
            // console.log(feed.children[0].innerText);
            Array.from(feed.children).forEach((entry) => {
                firstFeed.push(entry.innerText);
            });
            loadFeed(1, done);
        });
    
        //from Cranford walkthrough
        it("loads new content", () => {
    //         console.log(feed.children[0].innerText);
            //convert the feed to an array and loop over it
            Array.from(feed.children).forEach((entry, index) => {
                // console.log(entry.innerText, firstFeed[index], entry.inner === firstFeed[index]);
                //check that entries are not equal, therefore new
                expect(entry.innerText === firstFeed[index]).toBe(false);
            });
        });
    });
}());
