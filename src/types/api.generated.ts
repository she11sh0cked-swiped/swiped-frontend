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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `ID` scalar type represents a unique MongoDB identifier in collection. MongoDB by default use 12-byte ObjectId value (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB also may accepts string or integer as correct values for _id field. */
  MongoID: string;
};

export type CreateOnegroupInput = {
  membersId?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  name: Scalars['String'];
};

export type CreateOnegroupPayload = {
  __typename?: 'CreateOnegroupPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Group>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type ErrorInterface = {
  /** Generic error message */
  message?: Maybe<Scalars['String']>;
};


export type MongoError = ErrorInterface & {
  __typename?: 'MongoError';
  /** MongoDB error message */
  message?: Maybe<Scalars['String']>;
  /** MongoDB error code */
  code?: Maybe<Scalars['Int']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  user_login?: Maybe<UserWithToken>;
  user_register?: Maybe<UserWithToken>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  group_createOne?: Maybe<CreateOnegroupPayload>;
};


export type MutationUser_LoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUser_RegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGroup_CreateOneArgs = {
  record: CreateOnegroupInput;
};

export type Query = {
  __typename?: 'Query';
  user_findMe?: Maybe<User>;
};

export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export type ValidationError = ErrorInterface & {
  __typename?: 'ValidationError';
  /** Combined error message from all validators */
  message?: Maybe<Scalars['String']>;
  /** List of validator errors */
  errors?: Maybe<Array<ValidatorError>>;
};

export type ValidatorError = {
  __typename?: 'ValidatorError';
  /** Validation error message */
  message?: Maybe<Scalars['String']>;
  /** Source of the validation error from the model path */
  path?: Maybe<Scalars['String']>;
  /** Field value which occurs the validation error */
  value?: Maybe<Scalars['JSON']>;
  /** Input record idx in array which occurs the validation error. This `idx` is useful for createMany operation. For singular operations it always be 0. For *Many operations `idx` represents record index in array received from user. */
  idx: Scalars['Int'];
};

export type Group = {
  __typename?: 'group';
  membersId?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  name: Scalars['String'];
  _id: Scalars['MongoID'];
  members: Array<Maybe<User>>;
};

export type User = {
  __typename?: 'user';
  username: Scalars['String'];
  _id: Scalars['MongoID'];
  groupsId: Array<Maybe<Scalars['MongoID']>>;
  groups: Array<Maybe<Group>>;
};

export type UserWithToken = {
  __typename?: 'userWithToken';
  username: Scalars['String'];
  _id: Scalars['MongoID'];
  token: Scalars['String'];
};

export type CreateOnegroupPayloadKeySpecifier = ('recordId' | 'record' | 'error' | CreateOnegroupPayloadKeySpecifier)[];
export type CreateOnegroupPayloadFieldPolicy = {
	recordId?: FieldPolicy<any> | FieldReadFunction<any>,
	record?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ErrorInterfaceKeySpecifier = ('message' | ErrorInterfaceKeySpecifier)[];
export type ErrorInterfaceFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MongoErrorKeySpecifier = ('message' | 'code' | MongoErrorKeySpecifier)[];
export type MongoErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('user_login' | 'user_register' | 'group_createOne' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	user_login?: FieldPolicy<any> | FieldReadFunction<any>,
	user_register?: FieldPolicy<any> | FieldReadFunction<any>,
	group_createOne?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('user_findMe' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	user_findMe?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RuntimeErrorKeySpecifier = ('message' | RuntimeErrorKeySpecifier)[];
export type RuntimeErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ValidationErrorKeySpecifier = ('message' | 'errors' | ValidationErrorKeySpecifier)[];
export type ValidationErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ValidatorErrorKeySpecifier = ('message' | 'path' | 'value' | 'idx' | ValidatorErrorKeySpecifier)[];
export type ValidatorErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	path?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>,
	idx?: FieldPolicy<any> | FieldReadFunction<any>
};
export type groupKeySpecifier = ('membersId' | 'name' | '_id' | 'members' | groupKeySpecifier)[];
export type groupFieldPolicy = {
	membersId?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>
};
export type userKeySpecifier = ('username' | '_id' | 'groupsId' | 'groups' | userKeySpecifier)[];
export type userFieldPolicy = {
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	groupsId?: FieldPolicy<any> | FieldReadFunction<any>,
	groups?: FieldPolicy<any> | FieldReadFunction<any>
};
export type userWithTokenKeySpecifier = ('username' | '_id' | 'token' | userWithTokenKeySpecifier)[];
export type userWithTokenFieldPolicy = {
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	CreateOnegroupPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateOnegroupPayloadKeySpecifier | (() => undefined | CreateOnegroupPayloadKeySpecifier),
		fields?: CreateOnegroupPayloadFieldPolicy,
	},
	ErrorInterface?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ErrorInterfaceKeySpecifier | (() => undefined | ErrorInterfaceKeySpecifier),
		fields?: ErrorInterfaceFieldPolicy,
	},
	MongoError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MongoErrorKeySpecifier | (() => undefined | MongoErrorKeySpecifier),
		fields?: MongoErrorFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RuntimeError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RuntimeErrorKeySpecifier | (() => undefined | RuntimeErrorKeySpecifier),
		fields?: RuntimeErrorFieldPolicy,
	},
	ValidationError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ValidationErrorKeySpecifier | (() => undefined | ValidationErrorKeySpecifier),
		fields?: ValidationErrorFieldPolicy,
	},
	ValidatorError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ValidatorErrorKeySpecifier | (() => undefined | ValidatorErrorKeySpecifier),
		fields?: ValidatorErrorFieldPolicy,
	},
	group?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | groupKeySpecifier | (() => undefined | groupKeySpecifier),
		fields?: groupFieldPolicy,
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