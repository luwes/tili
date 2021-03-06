# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 0.12.0 - 2018-11-11

### Added

- Add `flat`, `castArray`, `once` function

## 0.11.0 - 2018-11-10

### Added

- Add `key`, `has`, `hasPath`, `without` function

### Changed

- Improved tree-shakeability of JS modules w/ agadoo

## 0.10.0 - 2018-09-09

### Added

- Add `pipe` function

## 0.9.1 - 2018-08-29

### Changed

- Remove auto curry from `tap`, improves tree-shake
- Make `round` tree-shakeable

## 0.9.0 - 2018-08-29

### Changed

- Use unbabelified bundle for pkg.module. The consumer of this library should make sure to run it through a transpiler. Benefit is that the consumer can bundle a separate lean ES2015 bundle.

## 0.8.4 - 2018-06-29

### Changed

- Fixed `defaultsDeep` function to not override `null` values with arrays or objects

## 0.8.3 - 2018-06-29

### Changed

- Fixed `merge` function when copying array or object to simple key value

## 0.8.2 - 2018-06-22

### Added

- Add `RegExp` to `clone` function

## 0.8.1 - 2018-06-22

### Added

- Fix `defaultsDeep` overwriting `null` value

## 0.8.0 - 2018-06-21

### Added

- Added `curry` placeholder

## 0.7.2 - 2018-06-19

### Changed

- Fix `escape`

## 0.7.1 - 2018-05-12

### Changed

- Update version

## 0.7.0 - 2018-05-12

### Added

- Add `defaultsDeep`, `escape`, `unescape` and `get`

## 0.6.0 - 2018-04-20

### Changed

- Update API docs

## 0.5.1 - 2018-04-17

### Changed

- Small change to `defer`

## 0.5.0 - 2018-04-17

### Added

- Reversed arguments for `throttle`

## 0.4.0 - 2018-04-16

### Added

- Added merge, isEmpty

## 0.3.0 - 2018-04-15

### Added

- Added `tap`, `pick`, `omit`, `clone`, `type`

## 0.2.0 - 2018-04-15

### Added

- Added `throttle` function

## 0.1.0 - 2018-04-15

### Added

- First release
