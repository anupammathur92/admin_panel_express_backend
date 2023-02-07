import pkg from 'nexus';
const { objectType, inputObjectType } = pkg;

export const User = objectType({
  name: 'User',
  definition(table) {
    table.nonNull.int('id');
    table.nonNull.string('name');
    table.nonNull.string('email');
  },
});

export const OutputResponse = objectType({
  name: 'OutputResponse',
  definition(t) {
    t.nonNull.string('msg');
    t.nonNull.string('status');
  },
});

export const CheckLoginResponse = objectType({
  name: 'CheckLoginResponse',
  definition(t) {
    t.nonNull.string('msg');
    t.nonNull.boolean('status');
  },
});

export const checkLoginInput = inputObjectType({
  name: 'CheckLoginInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  }
});

export const checkUserDetailInput = inputObjectType({
  name: 'checkUserDetailInput',
  definition(t) {
    t.nonNull.int('id');
  }
});

export const createUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('password');
  }
});

export const updateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.int('id');
  }
});

export const deleteInput = inputObjectType({
  name: 'deleteInput',
  definition(t) {
    t.nonNull.int('id');
  }
});