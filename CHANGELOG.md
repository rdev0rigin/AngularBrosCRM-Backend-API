# ChangeLog 
>To make sense of all your awesome busy-nes to other developers please log changes and use sem-ver. 
    
## Unreleased
## Version 0.7.0 06/14/2017
[code] Integrated SendGrid into an API

## Version 0.6.1 06/13/2017
[bug:fix] quoteLine destroy fixed

## Version 0.6.0 06/12/2017
[bug:fix] rebuilt `setQuoteLinesProps`

## Version 0.5.0 06/06/2017
[code] built quotes and quoteLines endpoints and queries

## Version 0.4.0 06/06/2017
[code] added endpoints for destroying contacts and companies
[refactor] renamed setProp to setProps and used convention `{id: model.id, props: updatedModel}`

## Version 0.3.0 06/06/2017
[code] added endpoints and queries for notes and contacts

## Version 0.2.3 05/03/2017
[refactor] rebuilt endpoints and queries to match convention `{payload: { 'prop': {key: prop.key, value: prop}, id?: prop.id, owner_id?:parent,id}}`
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