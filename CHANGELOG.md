# ChangeLog 
>please update so those that are not psychic know what you may have done to the module, thank you! ;) We use Semantic Versioning.
    
## Unreleased
[refactor] cleaned up `endpoints.ts` and their related query functions in `CRMStoreManager`

## Version 0.2.1 05/03/2017
[refactor] built an `Endpoints` 
 
[code] added endpoints for `Contacts`, `Companies`, `Notes`, and `Quotes`
[code] added query functions and create functions for new endpoints to table-models in `store-manager`

## Version 0.2.0 04/20/2017

[code] Created get and update in `StoreManager`
[refactor] Changed all but the unused models, into Typescript
[bug] fixed update function in `user.services` 
[refactor] changed nomenclature of workers to service

## Version 0.1.0
[code] seeded and initialized created `user-workers` and models and sqlite3 database with Sequelizer ORM.