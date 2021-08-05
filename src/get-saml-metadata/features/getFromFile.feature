Feature: Get data from metadata file
    Get data from xml metadata file

  Scenario Outline: Sucessfully get data from Metadata file

    Given "src/testdata/shibIdpMetadata.xml" exists in local file system
      And XML data is valid
    When client call getFromFile with the valid file path
    Then It should return a valid object with metadata values

  Scenario: Try to get data from unexistant file

    Given "file" DOES NOT exists in local file system
    When client call getFromFile with the invalid file path
    Then It should throw Error

  Scenario: Try to get data from an unparsable XML file

    Given "src/testdata/shibIdpMetadata.xml" exists in local file system
      And XML data is invalid
    When client call getFromFile with the valid file path
    Then IIt should throw Error

