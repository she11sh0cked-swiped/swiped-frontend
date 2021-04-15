import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `ID` scalar type represents a unique MongoDB identifier in collection. MongoDB by default use 12-byte ObjectId value (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB also may accepts string or integer as correct values for _id field. */
  MongoID: string;
};


export type Mutation = {
  __typename?: 'Mutation';
  user_login?: Maybe<UserWithToken>;
  user_register?: Maybe<UserWithToken>;
};


export type MutationUser_LoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUser_RegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user_findMe?: Maybe<User>;
};

export type User = {
  __typename?: 'user';
  username: Scalars['String'];
  _id: Scalars['MongoID'];
};

export type UserWithToken = {
  __typename?: 'userWithToken';
  username: Scalars['String'];
  _id: Scalars['MongoID'];
  token: Scalars['String'];
};

export type MutationKeySpecifier = ('user_login' | 'user_register' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	user_login?: FieldPolicy<any> | FieldReadFunction<any>,
	user_register?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('user_findMe' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	user_findMe?: FieldPolicy<any> | FieldReadFunction<any>
};
export type userKeySpecifier = ('username' | '_id' | userKeySpecifier)[];
export type userFieldPolicy = {
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type userWithTokenKeySpecifier = ('username' | '_id' | 'token' | userWithTokenKeySpecifier)[];
export type userWithTokenFieldPolicy = {
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	user?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | userKeySpecifier | (() => undefined | userKeySpecifier),
		fields?: userFieldPolicy,
	},
	userWithToken?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | userWithTokenKeySpecifier | (() => undefined | userWithTokenKeySpecifier),
		fields?: userWithTokenFieldPolicy,
	}
};