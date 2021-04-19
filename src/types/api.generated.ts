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

export type CreateOneuserInput = {
  username: Scalars['String'];
};

export type CreateOneuserPayload = {
  __typename?: 'CreateOneuserPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<User>;
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
  /** Create one document with mongoose defaults, setters, hooks and validation */
  user_createOne?: Maybe<CreateOneuserPayload>;
  user_login?: Maybe<Token>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  group_createOne?: Maybe<CreateOnegroupPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  group_joinById?: Maybe<UpdateByIdgroupPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  group_leaveById?: Maybe<UpdateByIdgroupPayload>;
};


export type MutationUser_CreateOneArgs = {
  record: CreateOneuserInput;
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUser_LoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGroup_CreateOneArgs = {
  record: CreateOnegroupInput;
};


export type MutationGroup_JoinByIdArgs = {
  _id: Scalars['MongoID'];
};


export type MutationGroup_LeaveByIdArgs = {
  _id: Scalars['MongoID'];
};

export type Query = {
  __typename?: 'Query';
  user_findMe?: Maybe<User>;
  group_findById?: Maybe<Group>;
};


export type QueryGroup_FindByIdArgs = {
  _id: Scalars['MongoID'];
};

export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export type UpdateByIdgroupPayload = {
  __typename?: 'UpdateByIdgroupPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Group>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
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
  ownerId: Scalars['MongoID'];
  _id: Scalars['MongoID'];
  owner?: Maybe<User>;
  members: Array<Maybe<User>>;
};

export type Token = {
  __typename?: 'token';
  token: Scalars['String'];
};

export type User = {
  __typename?: 'user';
  username: Scalars['String'];
  _id: Scalars['MongoID'];
  groupsId: Array<Maybe<Scalars['MongoID']>>;
  groups: Array<Maybe<Group>>;
};

export type CreateOnegroupPayloadKeySpecifier = ('recordId' | 'record' | 'error' | CreateOnegroupPayloadKeySpecifier)[];
export type CreateOnegroupPayloadFieldPolicy = {
	recordId?: FieldPolicy<any> | FieldReadFunction<any>,
	record?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateOneuserPayloadKeySpecifier = ('recordId' | 'record' | 'error' | CreateOneuserPayloadKeySpecifier)[];
export type CreateOneuserPayloadFieldPolicy = {
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
export type MutationKeySpecifier = ('user_createOne' | 'user_login' | 'group_createOne' | 'group_joinById' | 'group_leaveById' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	user_createOne?: FieldPolicy<any> | FieldReadFunction<any>,
	user_login?: FieldPolicy<any> | FieldReadFunction<any>,
	group_createOne?: FieldPolicy<any> | FieldReadFunction<any>,
	group_joinById?: FieldPolicy<any> | FieldReadFunction<any>,
	group_leaveById?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('user_findMe' | 'group_findById' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	user_findMe?: FieldPolicy<any> | FieldReadFunction<any>,
	group_findById?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RuntimeErrorKeySpecifier = ('message' | RuntimeErrorKeySpecifier)[];
export type RuntimeErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateByIdgroupPayloadKeySpecifier = ('recordId' | 'record' | 'error' | UpdateByIdgroupPayloadKeySpecifier)[];
export type UpdateByIdgroupPayloadFieldPolicy = {
	recordId?: FieldPolicy<any> | FieldReadFunction<any>,
	record?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
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
export type groupKeySpecifier = ('membersId' | 'name' | 'ownerId' | '_id' | 'owner' | 'members' | groupKeySpecifier)[];
export type groupFieldPolicy = {
	membersId?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerId?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>
};
export type tokenKeySpecifier = ('token' | tokenKeySpecifier)[];
export type tokenFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type userKeySpecifier = ('username' | '_id' | 'groupsId' | 'groups' | userKeySpecifier)[];
export type userFieldPolicy = {
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	groupsId?: FieldPolicy<any> | FieldReadFunction<any>,
	groups?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	CreateOnegroupPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateOnegroupPayloadKeySpecifier | (() => undefined | CreateOnegroupPayloadKeySpecifier),
		fields?: CreateOnegroupPayloadFieldPolicy,
	},
	CreateOneuserPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateOneuserPayloadKeySpecifier | (() => undefined | CreateOneuserPayloadKeySpecifier),
		fields?: CreateOneuserPayloadFieldPolicy,
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
	UpdateByIdgroupPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateByIdgroupPayloadKeySpecifier | (() => undefined | UpdateByIdgroupPayloadKeySpecifier),
		fields?: UpdateByIdgroupPayloadFieldPolicy,
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
	token?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | tokenKeySpecifier | (() => undefined | tokenKeySpecifier),
		fields?: tokenFieldPolicy,
	},
	user?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | userKeySpecifier | (() => undefined | userKeySpecifier),
		fields?: userFieldPolicy,
	}
};