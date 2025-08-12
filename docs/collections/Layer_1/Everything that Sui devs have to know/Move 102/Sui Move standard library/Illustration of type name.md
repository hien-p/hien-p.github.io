# Illustration of Sui Move standard library - type name (type_name)


`std::type_name` provides functions such as obtaining type string names, parsing their composition information, and runtime reflection, which helps to construct more robust and secure contract codes by judging the types.

* Get type information : Convert Move type to string representation
* Determine the basic type : Check whether it is a basic data type
* Extract address : parse package address from type name
* Get module name : extract module identifier from type name
* String conversion : TypeNameconversion to and from strings
* Runtime reflection : supports dynamic type checking and processing

Source code path: https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/move-stdlib/sources/type_name.move


The method diagram: 

![](https://img.learnblockchain.cn/attachments/2025/06/GmwRTgXw685ac0d195c87.png)




# Code before upgrade 

```
module cookbook::bookself {
    use sui::event;
    use std::ascii::String;
    use std::type_name::{Self, TypeName};

    public struct BookShelf has key {
        id: UID,
    }

    fun init(ctx: &mut TxContext) {
        transfer::share_object(
            Bookshelf{
                id: object::new(ctx),
            }
        );
    }

    public struct EventPrimitiveTypes has copy, drop {
        bool_type_name: String,
        u8_type_name: String,
        u256_type_name: String,
        address_type_name: String,
        vector_type_name: String,
        u8_is_primitive: bool,
        book_shelf_is_primitive: bool,
    }

    public struct EventInfo has copy, drop {
        type_name_address: String,
        type_name_module: String,
    }

    public entry fun emit_primitive_types() {
        event::emit(EventPrimitiveTypes{
            bool_type_name: type_name::get<bool>().into_string(),
            u8_type_name: type_name::get<u8>().into_string(),
            u256_type_name: type_name::get<u256>().into_string(),
            address_type_name: type_name::get<address>().into_string(),
            vector_type_name: type_name::get<vector<u8>>().into_string(),
            u8_is_primitive: type_name::get<u8>().is_primitive(),
            book_shelf_is_primitive: type_name::get<Bookshelf>().is_primitive(),
        })
    }

    public entry fun emit_get_info() {
        event::emit(EventInfo{
            type_name_address: type_name::get<Bookshelf>().get_address(),
            type_name_module: type_name::get<Bookshelf>().get_module(), 
        })
    }
}
```

After deployment: 
```
export PACKAGE_ID=0xa2bf2b8207708d9d4e7c57e3d035537ca80e490240340369ed0837f40f231fe2
export UPGRADE_CAP=0x8655cc8ea0c7b79abac0f15157c81c25b0a72b66efcdec32d8c8aa914faea1aa
```

```
sui client call --package $PACKAGE_ID --module bookself --function emit_primitive_types
```

The output: 
```
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Transaction Block Events                                                                                        │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  ┌──                                                                                                            │
│  │ EventID: 3Mkw7VBPCuyjGGWhxHd76Bog1Tb5pA183yMB2D9AwPYU:0                                                      │
│  │ PackageID: 0xa2bf2b8207708d9d4e7c57e3d035537ca80e490240340369ed0837f40f231fe2                                │
│  │ Transaction Module: bookself                                                                                 │
│  │ Sender: 0x915c2d19ee5fde257693f25e6c2cabb04c25e7ae03932817d52e122258c88ddb                                   │
│  │ EventType: 0xa2bf2b8207708d9d4e7c57e3d035537ca80e490240340369ed0837f40f231fe2::bookself::EventPrimitiveTypes │
│  │ ParsedJSON:                                                                                                  │
│  │   ┌─────────────────────────┬────────────┐                                                                   │
│  │   │ address_type_name       │ address    │                                                                   │
│  │   ├─────────────────────────┼────────────┤                                                                   │
│  │   │ book_shelf_is_primitive │ false      │                                                                   │
│  │   ├─────────────────────────┼────────────┤                                                                   │
│  │   │ bool_type_name          │ bool       │                                                                   │
│  │   ├─────────────────────────┼────────────┤                                                                   │
│  │   │ u256_type_name          │ u256       │                                                                   │
│  │   ├─────────────────────────┼────────────┤                                                                   │
│  │   │ u8_is_primitive         │ true       │                                                                   │
│  │   ├─────────────────────────┼────────────┤                                                                   │
│  │   │ u8_type_name            │ u8         │                                                                   │
│  │   ├─────────────────────────┼────────────┤                                                                   │
│  │   │ vector_type_name        │ vector<u8> │                                                                   │
│  │   └─────────────────────────┴────────────┘                                                                   │
│  └──                                                                                                            │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

Call the event interface of the throwing address and module name
```
sui client call --package $PACKAGE_ID --module bookself --function emit_get_info
```

```
╭───────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Transaction Block Events                                                                              │
├───────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  ┌──                                                                                                  │
│  │ EventID: CzjFhrgr4vHxbdp6tfr13LLM3EaXrDCbW2K275Sd8jeC:0                                            │
│  │ PackageID: 0xa2bf2b8207708d9d4e7c57e3d035537ca80e490240340369ed0837f40f231fe2                      │
│  │ Transaction Module: bookself                                                                       │
│  │ Sender: 0x915c2d19ee5fde257693f25e6c2cabb04c25e7ae03932817d52e122258c88ddb                         │
│  │ EventType: 0xa2bf2b8207708d9d4e7c57e3d035537ca80e490240340369ed0837f40f231fe2::bookself::EventInfo │
│  │ ParsedJSON:                                                                                        │
│  │   ┌───────────────────┬──────────────────────────────────────────────────────────────────┐         │
│  │   │ type_name_address │ a2bf2b8207708d9d4e7c57e3d035537ca80e490240340369ed0837f40f231fe2 │         │
│  │   ├───────────────────┼──────────────────────────────────────────────────────────────────┤         │
│  │   │ type_name_module  │ bookself                                                         │         │
│  │   └───────────────────┴──────────────────────────────────────────────────────────────────┘         │
│  └──                                                                                                  │
╰───────────────────────────────────────────────────────────────────────────────────────────────────────╯
```


# Upgraded code

In order to show the difference `get<T>` between and `get_with_original_ids<T>`, the contract is upgraded first. The following upgraded contract code ignores some of the codes before the upgrade.

```
module cookbook::bookshelf {
    use sui::event;
    use std::ascii::String;
    use std::type_name::{Self, TypeName};

    /// The Bookshelf object
    public struct BookShelf has key {
        id: UID,
    }

    /// Book structure definition
    public struct Book has key {
        id: UID,
        /// Book title
        title: String,
    }   

    ..

    /// Event structure to emit type name comparison
    public struct EventTypeName has copy, drop {
        defining_id_type: String,
        original_id_type: String,
    }

    /// Entry function to compare `get<T>()` and `get_with_original_ids<T>()`
    public entry fun compare_get_methods<T>() {
        let defining_id_type = type_name::get<T>();
        let original_id_type = type_name::get_with_original_ids<T>();

        event::emit(EventTypeName {
            defining_id_type: defining_id_type.into_string(),
            original_id_type: original_id_type.into_string(),
        });
    }
}
```
