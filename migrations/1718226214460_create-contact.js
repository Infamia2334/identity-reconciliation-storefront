/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createType('link_precedence', ['primary', 'secondary']);
    pgm.createTable({ name: 'contact' }, {
        id: { type: 'serial', primaryKey: true },
        phone_number: { type: 'text', notNull: false },
        email: { type: 'text', notNull: false },
        linked_id: { type: 'text', notNull: false },
        link_precedence: { type: 'link_precedence', notNull: true, default: 'secondary' }, //enum "secondary"|"primary"
        created_at: { type: 'timestamp', default: pgm.func('current_timestamp'), notNull: true },
        updated_at: { type: 'timestamp', default: pgm.func('current_timestamp'), notNull: true },
        deleted_at: { type: 'timestamp', default: pgm.func('current_timestamp'), null: true },
})};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable({ name: 'contact' });
    pgm.dropType('link_precedence');
};
