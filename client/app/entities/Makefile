HOC = hoc.t

all: create
create:
	mkdir -p $(NAME)
	cp ./templates/interface.t ./$(NAME)/interface.js
	sed -i '' 's/NAME/$(NAME)/g' ./$(NAME)/interface.js
	cp ./templates/store.t ./$(NAME)/store.js
	sed -i '' 's/NAME/$(NAME)/g' ./$(NAME)/store.js
	cp ./templates/queries.t ./$(NAME)/queries.js
