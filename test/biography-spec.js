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
            .withArgs('./build/data/biography.json')
            .returns({
                done: sinon.stub().callsArgWith(0, biographyFixture)
            });

        var subject = document.createElement('biography');
        document.body.appendChild(subject);
        riot.mount('biography');
    });

    it('has a title of form {firstName} {lastName}, {headline}', function () {
        var expectedTitle = document.querySelector('biography .title');
        expect(expectedTitle.innerText).to.equal('First Name Last Name, Headline');
    });

    it('has a biography paragraph', function () {
        var expectedTitle = document.querySelector('biography .biography');
        expect(expectedTitle.innerText).to.equal('Biography');
    });

    it('has a link to a LinkedIn profile page', function () {
        var expectedTitle = document.querySelector('biography .linkedin');
        expect(expectedTitle.innerText).to.equal('LinkedIn: https://www.linkedin.com/in/person');
    });

    afterEach(function () {
        jQuery.getJSON.restore();
    });
});