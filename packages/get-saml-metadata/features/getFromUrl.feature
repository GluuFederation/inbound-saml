Feature: Get data from metadata url
    Get data from xml metadata url

  Scenario Outline: Sucessfully get data from Metadata file

    Given "https://remoteIdp.com/metadata" is acessible
      And responds with XML
      And downloaded XML data is valid
    When client call getFromUrl with valid url
    Then It should return a valid object with metadata values

  Scenario: Try to get data from unexistant url

    Given "https://remoteIdp.com/unacessible" is NOT acessible
    When client call getFromUrl with the unacessible url
    Then It should throw Error

  Scenario: Try to get data from an unparsable XML data

    Given "https://remoteIdp.com/unparsable" is acessible
      And responds with XML
      And downloaded XML data is NOT valid
    When client call getFromUrl with valid url
    Then It should throw Error