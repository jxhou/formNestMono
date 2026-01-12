// test/graphql/form.integration.spec.ts
import { createTestApp } from '../setup/create-test-app';
import { gqlRequest } from '../setup/gql-request';
import { FormsModule } from '../../src/forms/forms.module';
import { Form } from '../../src/forms/models/form.model';
import { FormField } from '../../src/form-fields/models/form-field.model';

describe('Form GraphQL (integration)', () => {
  let app;
  let db;
  
  jest.setTimeout(120000); // Increase timeout for container startup


  beforeAll(async () => {
    const test = await createTestApp([FormsModule]);
    app = test.app;
    db = test.db;

    // Seed data
    const form = await Form.create({ name: 'Survey A', state: 1 });
    const field = await FormField.create({
      formId: form.id,
      name: 'Age',
      type: 'number',
    });
  });

  afterAll(async () => {
    await app.close();
    await db.stop();
  });

  it('fetches a form with fields', async () => {
    const query = `
      query {
        form(id: 1) {
          id
          name
          formFields {
            id
            name
          }
        }
      }
    `;

    const res = await gqlRequest(app, query);

    expect(res.body.data.form.name).toBe('Survey A');
    expect(res.body.data.form.formFields.length).toBe(1);
  });

  it('fetches all form with fields', async () => {
    const query = `
      query {
        forms {
          id
          name
          formFields {
            id
            name
          }
        }
      }
    `;

    const res = await gqlRequest(app, query);

    expect(res.body.data.forms.length).toBe(1);
    expect(res.body.data.forms[0].name).toBe('Survey A');
    expect(res.body.data.forms[0].formFields.length).toBe(1);
    expect(res.body.data.forms[0].formFields[0].name).toBe('Age');
  });
});
