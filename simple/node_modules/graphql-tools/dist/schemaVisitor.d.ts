import { GraphQLArgument, GraphQLDirective, GraphQLEnumType, GraphQLEnumValue, GraphQLField, GraphQLInputField, GraphQLInputObjectType, GraphQLInterfaceType, GraphQLNamedType, GraphQLObjectType, GraphQLScalarType, GraphQLSchema, GraphQLUnionType } from 'graphql';
export declare type VisitableSchemaType = GraphQLSchema | GraphQLObjectType | GraphQLInterfaceType | GraphQLInputObjectType | GraphQLNamedType | GraphQLScalarType | GraphQLField<any, any> | GraphQLArgument | GraphQLUnionType | GraphQLEnumType | GraphQLEnumValue;
export declare abstract class SchemaVisitor {
    schema: GraphQLSchema;
    static implementsVisitorMethod(methodName: string): boolean;
    visitSchema(schema: GraphQLSchema): void;
    visitScalar(scalar: GraphQLScalarType): GraphQLScalarType | void;
    visitObject(object: GraphQLObjectType): GraphQLObjectType | void;
    visitFieldDefinition(field: GraphQLField<any, any>, details: {
        objectType: GraphQLObjectType | GraphQLInterfaceType;
    }): GraphQLField<any, any> | void;
    visitArgumentDefinition(argument: GraphQLArgument, details: {
        field: GraphQLField<any, any>;
        objectType: GraphQLObjectType | GraphQLInterfaceType;
    }): GraphQLArgument | void;
    visitInterface(iface: GraphQLInterfaceType): GraphQLInterfaceType | void;
    visitUnion(union: GraphQLUnionType): GraphQLUnionType | void;
    visitEnum(type: GraphQLEnumType): GraphQLEnumType | void;
    visitEnumValue(value: GraphQLEnumValue, details: {
        enumType: GraphQLEnumType;
    }): GraphQLEnumValue | void;
    visitInputObject(object: GraphQLInputObjectType): GraphQLInputObjectType | void;
    visitInputFieldDefinition(field: GraphQLInputField, details: {
        objectType: GraphQLInputObjectType;
    }): GraphQLInputField | void;
}
export declare function visitSchema(schema: GraphQLSchema, visitorSelector: (type: VisitableSchemaType, methodName: string) => SchemaVisitor[]): GraphQLSchema;
export declare function healSchema(schema: GraphQLSchema): GraphQLSchema;
export declare class SchemaDirectiveVisitor extends SchemaVisitor {
    name: string;
    args: {
        [name: string]: any;
    };
    visitedType: VisitableSchemaType;
    context: {
        [key: string]: any;
    };
    static getDirectiveDeclaration(directiveName: string, schema: GraphQLSchema): GraphQLDirective;
    static visitSchemaDirectives(schema: GraphQLSchema, directiveVisitors: {
        [directiveName: string]: typeof SchemaDirectiveVisitor;
    }, context?: {
        [key: string]: any;
    }): {
        [directiveName: string]: SchemaDirectiveVisitor[];
    };
    protected static getDeclaredDirectives(schema: GraphQLSchema, directiveVisitors: {
        [directiveName: string]: typeof SchemaDirectiveVisitor;
    }): {
        [directiveName: string]: GraphQLDirective;
    };
    protected constructor(config: {
        name: string;
        args: {
            [name: string]: any;
        };
        visitedType: VisitableSchemaType;
        schema: GraphQLSchema;
        context: {
            [key: string]: any;
        };
    });
}
