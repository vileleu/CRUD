BLUE		= \033[0;34m
GREEN		= \033[0;32m
LIGHTBLUE	= \033[1;34m
RED			= \033[0;31m
YELLOW		= \033[1;33m
ORANGE		= \033[0;33m
MAGENTA		= \033[0;35m
RESET		= \033[0m

NAME		= crud

$(NAME):	
			@printf "$(BLUE)Build images, containers and volumes...$(RESET)\n"
			@docker compose up --build -d
			@printf " $(GREEN)[$(NAME) done][✔] $(RESET)\n"

all:		 $(NAME)

clean:
			@printf "$(RED)Delete containers...$(RESET)\n"
			@docker compose down
			@docker image prune -f --filter "label=com.project.name=crud"
			@printf "$(RED)[clean done]$(RESET)\n"

fclean:
			@printf "$(RED)Delete containers, volumes and images...$(RESET)\n"
			@docker compose down -v --rmi all
			@docker image prune -f --filter "label=com.project.name=crud"
			@printf "$(RED)[fclean done]$(RESET)\n"

re:			clean all

.PHONY:		clean re all