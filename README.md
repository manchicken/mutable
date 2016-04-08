# mutable
A program to auto-generate config files across your entire server farm.

## Config Data

Config data is always persisted within _mutable_ as YAML. Regardless of the method of persistence, all config data is always a YAML file.

Config data is made up of two parts:

 - The _General_ config values (the default values for config entries)
 - The _Server_ config values, which are unique to each individual server.

### Config values

Both server-specific and general config values are stored simply as YAML, so you may comment, structure, etc, however you like.

## Serializers

A serializer is the component which converts your configs from a nested structure into a text file for distribution across your infrastructure.

All serializers must contain:

 - A method named `serializeData` which:
     + Takes a JavaScript `Object` as its input
     + Returns a JavaScript `String` as its output
     + Is a pure function

## Config Definitions

A config definition is an object which contains a few things:

 - The `serializer`, which says which serialization method we should use to generate a text file
 - The `entries` JavaScript `Array`, containing JavaScript `Object`s with the keys:
     + `source`, which is the dot-notation locator from the generic config data
     + `destination`, which is the dot-notation locator for the output config data

### An example config defintion

(represented in YAML)

```yaml
serializer: json
entries:
  - source: foo.bar
    destination: baz.zoo
  - source: blah.blah[1]
    destination: baz.blergh
```

---
# OLD
---
# Running

## Setup

In order to set up mutable configs, you need four things:

 1. The base configs (YAML)
 2. The server-specific settings (also YAML)
 3. The distribution profile (still YAML)
 4. An output profile (you guessed it, YAML)

## Why YAML?

YAML is used because it's more expressive than JSON, or INI files. You can have deeply-nested
structures, combined with comments (which are not allowed in JSON), and external file references.

YAML is less widely-used, I get it, but it really is the best tool for this job.

### Base configs

Some of your configuration settings are general across your whole farm. An example of this would
be external endpoints or access keys.

An example of a base config would look like this:

```yaml
endpoints:
  # Web service #1
  ws-one:
    url: https://foo.com/path/to/ws/{server.instance-key}
    api-key: a70e7e3cbd5447a0da170a42c760d4ce

```

### Server-specific settings

Other settings in your configs will be specific to each individual server.

An example of a server-specific settings file could look like this:

```yaml
instance-key: abc123

```

```bash
mutable
```
