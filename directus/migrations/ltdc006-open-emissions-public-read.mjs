// Directus 12.4 masque les permissions qui contiennent une règle personnalisée
// lorsque l'entitlement `custom_permission_rules_enabled` n'est pas actif.
// Dans ce cas, le filtre `{ status: { _eq: 'published' } }` ajouté par les
// migrations précédentes fait disparaître toute la permission et l'API répond
// 403. Le site applique déjà systématiquement le filtre `status=published`
// dans libs/directus.ts, comme pour les autres collections publiques.

const PUBLIC_POLICY_ID = 'abf8a154-5b1c-4a46-ac9c-7300570f4f17';

const EMISSIONS_READ = {
  policy: PUBLIC_POLICY_ID,
  collection: 'emissions',
  action: 'read',
};

export async function up(knex) {
  if (!(await knex.schema.hasTable('emissions'))) return;

  const publicPolicy = await knex('directus_policies')
    .where({ id: PUBLIC_POLICY_ID })
    .first('id');
  if (!publicPolicy) return;

  const permission = {
    fields: '*',
    permissions: JSON.stringify({}),
    validation: JSON.stringify({}),
    presets: null,
  };
  const existing = await knex('directus_permissions')
    .where(EMISSIONS_READ)
    .first('id');

  if (existing) {
    await knex('directus_permissions')
      .where({ id: existing.id })
      .update(permission);
  } else {
    await knex('directus_permissions').insert({
      ...EMISSIONS_READ,
      ...permission,
    });
  }
}

export async function down(knex) {
  if (!(await knex.schema.hasTable('emissions'))) return;

  await knex('directus_permissions')
    .where(EMISSIONS_READ)
    .update({
      permissions: JSON.stringify({ status: { _eq: 'published' } }),
    });
}
