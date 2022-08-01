# Add Trusted IDP Persistence API

The Trusted IDP Persistence API is a rest service that handles Trusted IDP entity persistence.

1. Inside the Gluu chroot, navigate to `/opt/gluu/jetty/identity/custom/libs`;
2. In this folder, download the .jar file corresponding to the Gluu Server version currently installed: <https://jenkins.gluu.org/maven/org/gluu/api-rest/4.5.0-SNAPSHOT/api-rest-4.5.0-SNAPSHOT.jar> ;
3. Navigate to `/opt/gluu/jetty/identity/webapps/`;
4. Create a file called `identity.xml` **if it does not already exist** ;
5. Add the following to identity.xml as mentioned in doc [identity.xml](https://gluu.org/docs/gluu-server/4.3/api-guide/oxtrust-api/#vm-installation-instructions):

```xml
<?xml version="1.0"  encoding="ISO-8859-1"?>
<!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" "http://www.eclipse.org/jetty/configure_9_0.dtd">

<Configure class="org.eclipse.jetty.webapp.WebAppContext">
  <Set name="contextPath">/identity</Set>
  <Set name="war"><Property name="jetty.webapps" default="."/>/identity.war</Set>
  <Set name="extractWAR">true</Set>

  <Set name="extraClasspath">./custom/libs/api-rest-4.5.0-SNAPSHOT.jar</Set>
</Configure>
```

6. On the second to last line, replace `[jarName]` with the name of the .jar file downloaded in step 2.
7. restart **identity** service by command mentioned in document [services](https://gluu.org/docs/gluu-server/4.4/operation/services/)

