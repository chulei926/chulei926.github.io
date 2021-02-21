```shell
RUN cd / && wget 192.168.195.93:9999/pandoc-2.7.3-linux.tar.gz && tar -xzf pandoc-2.7.3-linux.tar.gz && chmod +x /pandoc-2.7.3/bin/* 
RUN ln -s /pandoc-2.7.3/bin/pandoc /bin/
RUN ln -s /pandoc-2.7.3/bin/pandoc-citeproc  /bin/
```