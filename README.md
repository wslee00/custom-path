# Custom Path Component

A custom path component built in lwc because the ootb path is, shall we say, limited.

The base path component handles the rendering of the path, but the meat of the logic is within any specific
implementation of the path component. The opportunityPath is provided as an example of how one
might go about implementing a production level path component.

The `main` branch uses the `lwc:if` `lwc:else` directives to properly render a specific stage component.
To see dynamic components in action, you can checkout the `dynamic-lwc` branch for implementation details
(you must have LWS enabled for this to work!).

Follow the buildout on [youtube](https://www.youtube.com/watch?v=v0MZqr6tDXo&list=PL--1YjRAv5OAer33vOorfObGGLIPqWJym&ab_channel=WilliamLee).

![image](https://github.com/user-attachments/assets/a878f94d-6864-4e4c-bd6c-107894b6b37b)
