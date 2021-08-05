Feature: Get data from metadata url
    Get data from xml metadata url

  Scenario Outline: Sucessfully get data from Metadata file

    Given "remoteIdp.com/metadata" is acessible
      And responds with XML
      And XML data is valid
    When client call getFromUrl with valid url
    Then It should return a valid object with metadata values

  Scenario: Try to get data from unexistant url

    Given "remoteIdp.com/metadata" is NOT acessible
    When client call getFromUrl with the unacessible url
    Then It should throw Error

  Scenario: Try to get data from an unparsable XML data

    Given "remoteIdp.com/metadata" is acessible
      And responds with XML
      And Xml data is NOT valid
    When client call getFromUrl with valid url
    Then It should throw Error