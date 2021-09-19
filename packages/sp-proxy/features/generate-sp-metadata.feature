Feature: Generate

Scenario: Successfully fetching metadata from endpoint

Given server is running
  And proxy have valid configuration
When "https://localhost/inbound-saml/sp/metadata" is called
Then endpoint should return metadata file according to configuration
