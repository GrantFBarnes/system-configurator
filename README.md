# System Configurator

This is an electron application used on my personal systems to help install various commonly used applications on linux machines.

## Development

Install all dependencies:

```
npm install
```

Run:

```
npm run start
```

Build snap package:

```
npm run dist
```

Install snap package:

```
sudo snap install dist/system-configurator_1.0.0_amd64.snap --dangerous --classic
```
