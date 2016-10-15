var biographyFixture = {
    "headline": "Headline",
    "firstName": "First Name",
    "lastName": "Last Name",
    "biography": "Biography",
    "linkedInProfileUrl": "https://www.linkedin.com/in/person"
};

describe('Biography', function () {
    beforeEach(function () {
        sinon.stub(jQuery, 'getJSON').returns({
            done: sinon.stub().callsArgWith(0, biographyFixture)
        });

        var subject = document.createElement('biography');
        document.body.appendChild(subject);
        riot.mount('biography');
    });

    it('has a title', function () {
        var expectedTitle = document.querySelector('biography h1.title');
        expect(expectedTitle).to.not.be.null;
    });

    it('has a title of form {firstName} {lastName}, {headline}', function () {
        var expectedTitle = document.querySelector('biography h1.title');
        expect(expectedTitle.innerText).to.equal('First Name Last Name, Headline');
    });

    afterEach(function () {
        jQuery.getJSON.restore();
    });
});