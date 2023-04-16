Cypress.Commands.add("addTag", (beginning, expected) => {
	cy.get(".new-task .card-footer span").first().click();
	cy.get(".in-creation-tag")
		.last()
		.type(beginning)
		.trigger("keydown", { key: "Tab" });

	cy.get(".in-creation-tag")
		.last()
		.invoke("val")
		.then((value) => {
			expect(value).to.equal(expected ? expected : beginning);
		});
});

Cypress.Commands.add("createTask", (title, description, tags) => {
	cy.get("#new-task-title").type(title);
	cy.get("#new-task-description").type(description);

	cy.wrap(tags).each((tag) => {
		cy.addTag(tag);
	});

	cy.get(".new-task .card-footer span").contains("Confirmar").click();
});

beforeEach(() => {
	cy.visit("http://localhost:5173/");
});

describe("Criação de tasks", () => {
	it("Carrega a página", () => {
		cy.get(".new-task");
	});

	it("Cria uma nova task", () => {
		cy.get("#new-task-title").type("Nova tarefa");
		cy.get("#new-task-description").type("Descrição da tarefa");

		cy.get(".new-task .card-footer span").contains("Confirmar").click();
		cy.get(".task");
	});

	it("Cria uma nova task com tags", () => {
		cy.get("#new-task-title").type("Nova tarefa com tags");
		cy.get("#new-task-description").type("Descrição da tarefa");
		cy.get(".new-task .card-footer span").first().click();
		cy.get(".in-creation-tag").last().type("tag1");

		// Finaliza e checa se a task foi criada
		cy.get(".new-task .card-footer span").contains("Confirmar").click();
		cy.get(".task");
	});

	it("Autocomplete de tag funciona", () => {
		cy.get("#new-task-title").type("Nova tarefa com tags");
		cy.get("#new-task-description").type("Descrição da tarefa");

		cy.addTag("c", "code");
		cy.addTag("n", "note");
		cy.addTag("a");
	});
});
