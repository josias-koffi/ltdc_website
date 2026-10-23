// Ordre d'affichage des membres dans leur équipe.
//
// `members.order` existait déjà (champ de tri de la collection, lu par le site),
// mais masqué et vide : impossible de choisir qui apparaît en premier. On l'affiche
// dans le formulaire et on numérote les membres existants pour que le
// glisser-déposer de la liste du BO parte d'un ordre complet.
//
// Comme ltdc001 : sur une base vide, members vient de directus/snapshot.yaml.

const NOTE = "Position dans l'équipe : 1 apparaît en premier (ou glisser les membres dans la liste)";

export async function up(knex) {
  if (!(await knex.schema.hasTable('members'))) return;

  if (!(await knex.schema.hasColumn('members', 'order'))) {
    await knex.schema.alterTable('members', (table) => {
      table.integer('order');
    });
  }

  const field = { collection: 'members', field: 'order' };
  const meta = { hidden: false, interface: 'input', note: NOTE, width: 'half' };
  if (await knex('directus_fields').where(field).first('id')) {
    await knex('directus_fields').where(field).update(meta);
  } else {
    await knex('directus_fields').insert({ ...field, ...meta, sort: 8 });
  }
  await knex('directus_collections').where({ collection: 'members' }).update({ sort_field: 'order' });

  // Les membres sans position passent après les autres, par équipe puis par nom.
  const max = await knex('members').max('order as max').first();
  let next = (max?.max ?? 0) + 1;
  const unsorted = await knex('members').whereNull('order').orderBy(['team', 'name', 'id']).select('id');
  for (const { id } of unsorted) {
    await knex('members').where({ id }).update({ order: next++ });
  }
}

export async function down(knex) {
  if (!(await knex.schema.hasTable('members'))) return;

  await knex('directus_fields')
    .where({ collection: 'members', field: 'order' })
    .update({ hidden: true, note: null, width: 'full' });
}
