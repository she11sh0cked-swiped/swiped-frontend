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
  votes?: Maybe<Array<Maybe<UserVotesInput>>>;
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
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  user_updateMe?: Maybe<UpdateByIduserPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  group_createOne?: Maybe<CreateOnegroupPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  group_joinById?: Maybe<UpdateByIdgroupPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  group_leaveById?: Maybe<UpdateByIdgroupPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  group_updateById?: Maybe<UpdateByIdgroupPayload>;
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


export type MutationUser_UpdateMeArgs = {
  record: UpdateByIduserInput;
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


export type MutationGroup_UpdateByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdgroupInput;
};

export type Query = {
  __typename?: 'Query';
  user_findMe?: Maybe<User>;
  group_findById?: Maybe<Group>;
  media_findById?: Maybe<Media>;
  media_findByIds?: Maybe<Array<Maybe<Media>>>;
  media_recommendations?: Maybe<Array<Maybe<Media>>>;
};


export type QueryGroup_FindByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryMedia_FindByIdArgs = {
  media: MediaKeyInput;
};


export type QueryMedia_FindByIdsArgs = {
  media: Array<MediaKeyInput>;
};

export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export type UpdateByIdgroupInput = {
  membersId?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['MongoID']>;
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

export type UpdateByIduserInput = {
  username?: Maybe<Scalars['String']>;
  votes?: Maybe<Array<Maybe<UpdateByIduserVotesInput>>>;
};

export type UpdateByIduserPayload = {
  __typename?: 'UpdateByIduserPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<User>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateByIduserVotesInput = {
  like?: Maybe<Scalars['Boolean']>;
  mediaId?: Maybe<UpdateByIduserVotesMediaIdInput>;
};

export type UpdateByIduserVotesMediaIdInput = {
  id?: Maybe<Scalars['Float']>;
  media_type?: Maybe<Scalars['String']>;
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
  matches: Array<Match>;
};

export type Match = {
  __typename?: 'match';
  count?: Maybe<Scalars['Int']>;
  media: Media;
};

export type Media = {
  backdrop_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  original_language?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Float']>;
  poster_path?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  media_type: Media_Type;
};

export type MediaKey = {
  __typename?: 'mediaKey';
  id: Scalars['Int'];
  media_type: Media_Type;
};

export type MediaKeyInput = {
  id: Scalars['Int'];
  media_type: Media_Type;
};

export enum Media_Type {
  Movie = 'movie',
  Tv = 'tv'
}

export type Movie = Media & {
  __typename?: 'movie';
  adult?: Maybe<Scalars['Boolean']>;
  original_title?: Maybe<Scalars['String']>;
  release_date?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  backdrop_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  original_language?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Float']>;
  poster_path?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  media_type: Media_Type;
};

export type Token = {
  __typename?: 'token';
  token: Scalars['String'];
};

export type Tv = Media & {
  __typename?: 'tv';
  first_air_date?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  original_language?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Float']>;
  poster_path?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  media_type: Media_Type;
};

export type User = {
  __typename?: 'user';
  username: Scalars['String'];
  votes: Array<Vote>;
  _id: Scalars['MongoID'];
  groupsId: Array<Maybe<Scalars['MongoID']>>;
  groups: Array<Maybe<Group>>;
};

export type UserVotesInput = {
  like?: Maybe<Scalars['Boolean']>;
  mediaId?: Maybe<UserVotesMediaIdInput>;
};

export type UserVotesMediaIdInput = {
  id?: Maybe<Scalars['Float']>;
  media_type?: Maybe<Scalars['String']>;
};

export type Vote = {
  __typename?: 'vote';
  like: Scalars['Boolean'];
  mediaId: MediaKey;
  media?: Maybe<Media>;
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
export type MutationKeySpecifier = ('user_createOne' | 'user_login' | 'user_updateMe' | 'group_createOne' | 'group_joinById' | 'group_leaveById' | 'group_updateById' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	user_createOne?: FieldPolicy<any> | FieldReadFunction<any>,
	user_login?: FieldPolicy<any> | FieldReadFunction<any>,
	user_updateMe?: FieldPolicy<any> | FieldReadFunction<any>,
	group_createOne?: FieldPolicy<any> | FieldReadFunction<any>,
	group_joinById?: FieldPolicy<any> | FieldReadFunction<any>,
	group_leaveById?: FieldPolicy<any> | FieldReadFunction<any>,
	group_updateById?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('user_findMe' | 'group_findById' | 'media_findById' | 'media_findByIds' | 'media_recommendations' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	user_findMe?: FieldPolicy<any> | FieldReadFunction<any>,
	group_findById?: FieldPolicy<any> | FieldReadFunction<any>,
	media_findById?: FieldPolicy<any> | FieldReadFunction<any>,
	media_findByIds?: FieldPolicy<any> | FieldReadFunction<any>,
	media_recommendations?: FieldPolicy<any> | FieldReadFunction<any>
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
export type UpdateByIduserPayloadKeySpecifier = ('recordId' | 'record' | 'error' | UpdateByIduserPayloadKeySpecifier)[];
export type UpdateByIduserPayloadFieldPolicy = {
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
export type groupKeySpecifier = ('membersId' | 'name' | 'ownerId' | '_id' | 'owner' | 'members' | 'matches' | groupKeySpecifier)[];
export type groupFieldPolicy = {
	membersId?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerId?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>,
	matches?: FieldPolicy<any> | FieldReadFunction<any>
};
export type matchKeySpecifier = ('count' | 'media' | matchKeySpecifier)[];
export type matchFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>
};
export type mediaKeySpecifier = ('backdrop_path' | 'genre_ids' | 'original_language' | 'overview' | 'popularity' | 'poster_path' | 'vote_average' | 'vote_count' | 'id' | 'media_type' | mediaKeySpecifier)[];
export type mediaFieldPolicy = {
	backdrop_path?: FieldPolicy<any> | FieldReadFunction<any>,
	genre_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	original_language?: FieldPolicy<any> | FieldReadFunction<any>,
	overview?: FieldPolicy<any> | FieldReadFunction<any>,
	popularity?: FieldPolicy<any> | FieldReadFunction<any>,
	poster_path?: FieldPolicy<any> | FieldReadFunction<any>,
	vote_average?: FieldPolicy<any> | FieldReadFunction<any>,
	vote_count?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	media_type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type mediaKeyKeySpecifier = ('id' | 'media_type' | mediaKeyKeySpecifier)[];
export type mediaKeyFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	media_type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type movieKeySpecifier = ('adult' | 'original_title' | 'release_date' | 'title' | 'video' | 'backdrop_path' | 'genre_ids' | 'original_language' | 'overview' | 'popularity' | 'poster_path' | 'vote_average' | 'vote_count' | 'id' | 'media_type' | movieKeySpecifier)[];
export type movieFieldPolicy = {
	adult?: FieldPolicy<any> | FieldReadFunction<any>,
	original_title?: FieldPolicy<any> | FieldReadFunction<any>,
	release_date?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	video?: FieldPolicy<any> | FieldReadFunction<any>,
	backdrop_path?: FieldPolicy<any> | FieldReadFunction<any>,
	genre_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	original_language?: FieldPolicy<any> | FieldReadFunction<any>,
	overview?: FieldPolicy<any> | FieldReadFunction<any>,
	popularity?: FieldPolicy<any> | FieldReadFunction<any>,
	poster_path?: FieldPolicy<any> | FieldReadFunction<any>,
	vote_average?: FieldPolicy<any> | FieldReadFunction<any>,
	vote_count?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	media_type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type tokenKeySpecifier = ('token' | tokenKeySpecifier)[];
export type tokenFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type tvKeySpecifier = ('first_air_date' | 'name' | 'origin_country' | 'original_name' | 'backdrop_path' | 'genre_ids' | 'original_language' | 'overview' | 'popularity' | 'poster_path' | 'vote_average' | 'vote_count' | 'id' | 'media_type' | tvKeySpecifier)[];
export type tvFieldPolicy = {
	first_air_date?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	origin_country?: FieldPolicy<any> | FieldReadFunction<any>,
	original_name?: FieldPolicy<any> | FieldReadFunction<any>,
	backdrop_path?: FieldPolicy<any> | FieldReadFunction<any>,
	genre_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	original_language?: FieldPolicy<any> | FieldReadFunction<any>,
	overview?: FieldPolicy<any> | FieldReadFunction<any>,
	popularity?: FieldPolicy<any> | FieldReadFunction<any>,
	poster_path?: FieldPolicy<any> | FieldReadFunction<any>,
	vote_average?: FieldPolicy<any> | FieldReadFunction<any>,
	vote_count?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	media_type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type userKeySpecifier = ('username' | 'votes' | '_id' | 'groupsId' | 'groups' | userKeySpecifier)[];
export type userFieldPolicy = {
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	groupsId?: FieldPolicy<any> | FieldReadFunction<any>,
	groups?: FieldPolicy<any> | FieldReadFunction<any>
};
export type voteKeySpecifier = ('like' | 'mediaId' | 'media' | voteKeySpecifier)[];
export type voteFieldPolicy = {
	like?: FieldPolicy<any> | FieldReadFunction<any>,
	mediaId?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>
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
	UpdateByIduserPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateByIduserPayloadKeySpecifier | (() => undefined | UpdateByIduserPayloadKeySpecifier),
		fields?: UpdateByIduserPayloadFieldPolicy,
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
	match?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | matchKeySpecifier | (() => undefined | matchKeySpecifier),
		fields?: matchFieldPolicy,
	},
	media?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | mediaKeySpecifier | (() => undefined | mediaKeySpecifier),
		fields?: mediaFieldPolicy,
	},
	mediaKey?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | mediaKeyKeySpecifier | (() => undefined | mediaKeyKeySpecifier),
		fields?: mediaKeyFieldPolicy,
	},
	movie?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | movieKeySpecifier | (() => undefined | movieKeySpecifier),
		fields?: movieFieldPolicy,
	},
	token?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | tokenKeySpecifier | (() => undefined | tokenKeySpecifier),
		fields?: tokenFieldPolicy,
	},
	tv?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | tvKeySpecifier | (() => undefined | tvKeySpecifier),
		fields?: tvFieldPolicy,
	},
	user?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | userKeySpecifier | (() => undefined | userKeySpecifier),
		fields?: userFieldPolicy,
	},
	vote?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | voteKeySpecifier | (() => undefined | voteKeySpecifier),
		fields?: voteFieldPolicy,
	}
};