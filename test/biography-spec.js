var biographyFixture = {
    "headline": "Headline",
    "firstName": "First Name",
    "lastName": "Last Name",
    "biography": "Biography",
    "linkedInProfileUrl": "https://www.linkedin.com/in/person"
};

describe('Biography', function () {
    beforeEach(function () {
        sinon.stub(jQuery, 'getJSON')
            .yieldsTo('done', biographyFixture);

        var subject = document.createElement('biography');
        document.body.appendChild(subject);
        riot.mount('biography');
    });

    it('has a title', function () {
        var expectedTitle = document.querySelector('biography h1.title');
        expect(expectedTitle).to.not.be.null;
    });

    it('has a title of form {headline}: {firstName} {lastName}', function () {
        var expectedTitle = document.querySelector('biography h1.title');
        expect(expectedTitle.innerText).to.equal('Headline: First Name Last Name');
    });

    afterEach(function () {
        jQuery.getJSON.restore();
    });
});