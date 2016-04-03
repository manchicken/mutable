# mutable
A program to auto-generate config files across your entire server farm.

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