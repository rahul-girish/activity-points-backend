# Schemas

## Organisation
### Purpose
To enable users from different organisations to be completely separate. I initially considered making separate deployments for each organisation, but that would involve domain clashes (JJK reference, anyone?). I just thought it'd be simpler to have a single platform where you just choose your organisation, or choose `None`.

### Specifics
```
{
    name: {
        type: String,
        unique: true,
        required: true
    },
}
```
It only contains a unique name. Nothing fancy.

## User
### Purpose
Every platform has users, right?

### Specifics
```
{
    username: {
        type: String,
        required: true,
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() { return !this.googleId; },
        select: false
    },
    googleId: {
        type: String,
        unique: true, 
        sparse: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}
```

Quite standard. Username, organisation, email, password, googleId (for OAuth), and a verification check. Note that passwords are only required if OAuth is not used. The idea is that the user will choose their organisation immediately after sign-up. If `None` is chosen, verification is instant. Else, the admin will have to verify their belonging to the organisation. Perhaps they may let anyone in, or perhaps counselors may verify students.

Sigh. A lot more code to write.

## Admin
### Purpose
To have access to the entire database, with maximum permissions.

### Specifics
```
{
    permissions: [String]
}
```

I think that's a placeholder, we don't really need any information, we just need to know that the person is an admin.

## Counselor
### Purpose
To have access to the data of a small number of students (~20).

### Specifics
```
{
    department: {
        type: String,
        trim: true
    }
}
```

Don't really know what else to include.

## Student
### Purpose
To enable a student to track his/her own progress.

### Specifics
```
{
    usn: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    currentYear: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    branch: {
        type: String,
        required: true
    },
    counselor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'counselor'
    },
}
```

Only included details that are necessary. USN, year, branch and counselor are all fundamental.

## Activity
### Purpose
Stores information about an activity performed by a student.

### Specifics
```
{
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },    
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    points: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'rejected']
    },
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
}
```

Also contains just necessary information. The certificates and reports are stored in a File, which will probably come with a storage abstraction layer.

## File
### Purpose
To store a reference to a file in an object database or local storage. And also metadata.

### Specifics
```
{
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    fileId: {
        type: String, 
        default: uuidv4, 
        index: true 
    },
    fileName: { 
        type: String, 
        required: true 
    },
    storageKey: { 
        type: String, 
        required: true 
    },
    mimeType: { 
        type: String, 
        required: true 
    },
    size: { 
        type: Number, 
        required: true 
    }
}
```

`fileId` uses a UUID to avoid name collisions in storage. Everything else is simple.