# Server

## MongoDB Schemas

### User

```ts
interface User {
    _id: ObjectId,
    email: string;
    name: string;
    password: string;
    token: string;
    tokenExp: number;
    createdAt: Date;
    updatedAt: Data;
};
```

### Increment

```ts
interface Increment {
    _id: ObjectId;
    key: string;
    seq: number;
};
```

### Article

```ts
interface Article {
    _id: ObjectId;
    id: Increment.seq;
    title: string;
    content: string;
    isDeleted: boolean;
    user: User._id;
    createdAt: Date;
    updatedAt: Date;
};
```

### Comment

```ts
interface Comment {
    _id: ObjectId;
    id: Increment.seq;
    content: string;
    isDeleted: boolean;
    article: Article.id;
    user: User._id;
    createdAt: Date;
    updatedAt: Date;
};
```

## API

### User Signup & Authentication

```ts
const endpoint = {
    method: 'post',
    url: '/api/auth'
};

interface Request {
    body: {
        name: string;
        email: string;
        password: string;
    }
};

interface Response {
    headers: {
        cookies: {
            token: string;
            tokenExp: number;
        }
    },
    data: {
        ok: boolean;
        user: {
            _id: ObjectId;
            email: string;
            name: string;
        } | undefined;
        error: string | undefined;
    }
};
```

### User Signin & Authentication

```ts
const endpoint = {
    method: 'patch',
    url: '/api/auth'
};

interface Request {
    body: {
        email: string;
        password: string;
    }
};

interface Response {
    headers: {
        cookies: {
            token: string;
            tokenExp: number;
        }
    },
    data: {
        ok: boolean;
        user: {
            _id: ObjectId;
            email: string;
            name: string;
        } | undefined;
        error: string | undefined;
    }
};
```

### User Authorization

```ts
const endpoint = {
    method: 'get',
    url: '/api/auth'
};

interface Request {
    headers: {
        cookies: {
            token: string;
            tokenExp: number;
        };
    };
};

interface Response {
    data: {
        ok: boolean;
        user?: {
            _id: ObjectId;
            name: string;
            email: string;
        };
        error: string | undefined;
    }
};
```

### User Signout

```ts
const endpoint = {
    method: 'delete',
    url: '/api/auth'
};

interface Request {
    headers: {
        cookies: {
            token: string;
            tokenExp: number;
        };
    };
};

interface Response {
    data: {
        ok: boolean;
        error: string | undefined;
    }
};
```

### Get all Articles

```ts
const endpoint = {
    method: 'get',
    url: '/api/articles'
};

interface Request { };

interface Response {
    data: {
        ok: boolean;
        articles: Array<Article> | undefined;
        error: string | undefined;
    }
};
```

### Get one Article

```ts
const endpoint = {
    method: 'get',
    url: '/api/articles/:articleId'
};

interface Request {
    params: {
        articleId: number;
    }
};

interface Response {
    data: {
        ok: boolean;
        article: Article | undefined;
        error: string | undefined;
    }
};
```

### Create Article

```ts
const endpoint = {
    method: 'post',
    url: '/api/articles'
};

interface Request {
    headers: {
        cookies: {
            token: string;
            tokenExp: string;
        }
    };
    body: {
        title: string;
        content: string;
    };
};

interface Response {
    data: {
        ok: boolean;
        article: Article | undefined;
        error: string | undefined;
    }
};
```

### Update Article

```ts
const endpoint = {
    method: 'patch',
    url: '/api/articles/:articleId'
};

interface Request {
    headers: {
        cookies: {
            token: string;
            tokenExp: string;
        }
    };
    params: {
        articleId: number;
    };
    body: {
        title: string;
        content: string;
    };
};

interface Response {
    data: {
        ok: boolean;
        article: Article | undefined;
        error: string | undefined;
    }
};
```

### Delete Article

```ts
const endpoint = {
    method: 'delete',
    url: '/api/articles/:articleId'
};

interface Request {
    headers: {
        cookies: {
            token: string;
            tokenExp: string;
        }
    };
    params: {
        articleId: number;
    };
    body: {
        title: string;
        content: string;
    };
};

interface Response {
    data: {
        ok: boolean;
        error: string | undefined;
    }
};
```

### Get all Comments

```ts
const endpoint = {
    method: 'get',
    url: '/api/articles/:articleId/comments'
};

interface Request {
    params: {
        articleId: number;
    };
};

interface Response {
    data: {
        ok: boolean;
        comments: Array<Comment> | undefined;
        error: string | undefined;
    }
};
```

### Create Comment

```ts
const endpoint = {
    method: 'post',
    url: '/api/articles/:articleId/comments'
};

interface Request {
    headers: {
        cookies: {
            token: string;
            tokenExp: number;
        };
    };
    params: {
        articleId: number;
    };
    body: {
        content: string;
    };
};

interface Response {
    data: {
        ok: boolean;
        comment: Comment | undefined;
        error: string | undefined;
    };
};
```

### Update Comment

```ts
const endpoint = {
    method: 'patch',
    url: '/api/articles/:articleId/comments/:commentId'
};

interface Request {
    headers: {
        cookies: {
            token: string;
            tokenExp: number;
        };
    };
    params: {
        articleId: number;
        commentId: number;
    };
    body: {
        content: string;
    };
};

interface Response {
    data: {
        ok: boolean;
        comment: Comment | undefined;
        error: string | undefined;
    };
};
```

### Delete Comment

```ts
const endpoint = {
    method: 'delete',
    url: '/api/articles/:articleId/comments/:commentId'
};

interface Request {
    headers: {
        cookies: {
            token: string;
            tokenExp: number;
        };
    };
    params: {
        articleId: number;
        commentId: number;
    };
};

interface Response {
    data: {
        ok: boolean;
        error: string | undefined;
    };
};
```