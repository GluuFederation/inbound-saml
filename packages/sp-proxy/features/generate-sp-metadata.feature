Feature: Generate

Scenario: Successfully fetching metadata from endpoint

Given server is running
  And proxy have valid configuration
When "http://localhost:5000/sp/metadata" is called
Then endpoint should return metadata file according to configuration
